using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using api.Interfaces;

namespace YourNamespace
{
    public class EmailService : IEmailService
    {
        public async Task SendPasswordResetEmail(string email, string resetToken)
        {
            // Tạo đối tượng SmtpClient
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("20t1020649@husc.edu.vn", "01685373536Vy"),
                EnableSsl = true,
            };

            // Tạo nội dung email
            var subject = "Reset your password";
            var message = $"Please click the following link to reset your password: <a href='http://localhost:3000?token={resetToken}'>Reset Password</a>";

            // Tạo đối tượng MailMessage
            var mailMessage = new MailMessage
            {
                From = new MailAddress("20t1020649@husc.edu.vn"),
                Subject = subject,
                Body = message,
                IsBodyHtml = true,
            };

            // Thêm địa chỉ email của người nhận
            mailMessage.To.Add(email);

            // Gửi email bất đồng bộ
            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
