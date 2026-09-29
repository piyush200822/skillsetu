using System;
using System.Diagnostics;
using System.IO;
using System.Net.Sockets;
using System.Threading;

namespace SkillSetuLauncher
{
    class Program
    {
        static Process serverProcess = null;
        static string projectPath = @"C:\Users\piyus\.gemini\antigravity\scratch\ayush-skillbridge";

        static void Main(string[] args)
        {
            Console.Title = "SkillSetu - Academia-Industry Collaboration Portal";
            Console.ForegroundColor = ConsoleColor.Green;

            Console.WriteLine("===============================================================================");
            Console.WriteLine("       NATIONAL COLLABORATION * ALL INDIA INSTITUTE OF AYURVEDA (AIIA)        ");
            Console.WriteLine("            SkillSetu: Academia - Industry Collaboration Portal                ");
            Console.WriteLine("             Database Storage & Public Tunnel Gateway Enabled                  ");
            Console.WriteLine("                    Problem Statement ID: 26044                                ");
            Console.WriteLine("===============================================================================");
            Console.ResetColor();

            if (!Directory.Exists(projectPath))
            {
                string currentDir = AppDomain.CurrentDomain.BaseDirectory;
                if (File.Exists(Path.Combine(currentDir, "package.json")))
                {
                    projectPath = currentDir;
                }
            }

            Console.WriteLine("\n[1/2] Database: server/data/skillsetu_database.json (Persistent Storage Active)");
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("      Working Directory: " + projectPath);
            Console.ResetColor();

            if (!IsPortInUse(5000))
            {
                Console.WriteLine("\n[2/2] Starting Full-Stack Server & Public Tunnel on Port 5000...");
                ProcessStartInfo sInfo = new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = "/c node server/serve_all.js",
                    WorkingDirectory = projectPath,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                serverProcess = Process.Start(sInfo);
            }
            else
            {
                Console.WriteLine("\n[2/2] Server & Tunnel are already running on Port 5000.");
            }

            Thread.Sleep(3000);

            string localUrl = "http://localhost:5000";
            string publicUrl = "https://johnston-verde-positioning-prisoner.trycloudflare.com";

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("\n===============================================================================");
            Console.WriteLine("  SUCCESS: SkillSetu Platform is LIVE with Persistent DB Storage!");
            Console.WriteLine("  * Local URL:  " + localUrl);
            Console.WriteLine("  * Public URL: " + publicUrl);
            Console.WriteLine("  * QR Code Link: https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=https%3A%2F%2Fjohnston-verde-positioning-prisoner.trycloudflare.com");
            Console.WriteLine("===============================================================================");
            Console.ResetColor();

            try
            {
                Process.Start(new ProcessStartInfo(localUrl) { UseShellExecute = true });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Could not open browser automatically: " + ex.Message);
            }

            Console.WriteLine("\n-------------------------------------------------------------------------------");
            Console.WriteLine("  CONTROLS:");
            Console.WriteLine("  * Press [O] to re-open browser at " + localUrl);
            Console.WriteLine("  * Press [T] to copy/print the Public URL for teammates");
            Console.WriteLine("  * Press [Q] or [Esc] to exit and stop all services");
            Console.WriteLine("-------------------------------------------------------------------------------\n");

            while (true)
            {
                ConsoleKeyInfo keyInfo = Console.ReadKey(true);
                if (keyInfo.Key == ConsoleKey.Q || keyInfo.Key == ConsoleKey.Escape)
                {
                    Console.WriteLine("\nShutting down SkillSetu services & database locks...");
                    KillProcesses();
                    Console.WriteLine("Services stopped. Goodbye!");
                    Thread.Sleep(1000);
                    break;
                }
                else if (keyInfo.Key == ConsoleKey.O)
                {
                    Console.WriteLine("\nRe-opening browser at " + localUrl + "...");
                    Process.Start(new ProcessStartInfo(localUrl) { UseShellExecute = true });
                }
                else if (keyInfo.Key == ConsoleKey.T)
                {
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine("\n>> Share this link with your teammates:");
                    Console.WriteLine("   " + publicUrl);
                    Console.ResetColor();
                }
            }
        }

        static bool IsPortInUse(int port)
        {
            try
            {
                using (var client = new TcpClient())
                {
                    var result = client.BeginConnect("127.0.0.1", port, null, null);
                    bool success = result.AsyncWaitHandle.WaitOne(400);
                    if (!success) return false;
                    client.EndConnect(result);
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        static void KillProcesses()
        {
            try
            {
                if (serverProcess != null && !serverProcess.HasExited) serverProcess.Kill();
            }
            catch { }

            try
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = "/c taskkill /f /im node.exe /im cloudflared.exe >nul 2>&1",
                    UseShellExecute = false,
                    CreateNoWindow = true
                });
            }
            catch { }
        }
    }
}
