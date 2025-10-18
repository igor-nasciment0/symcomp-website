import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

class EmailSender:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.sender_email = os.getenv('EMAIL_USER').strip()
        self.password = os.getenv('EMAIL_PASSWORD').strip()

    def send(self, subject: str, html: str, to_email: str):
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = self.sender_email
        msg['To'] = to_email
        msg.attach(MIMEText(html, 'html'))

        print("SMTP_SERVER:", self.smtp_server)
        print("SMTP_PORT:", self.smtp_port)

        try:
            with smtplib.SMTP_SSL(self.smtp_server, self.smtp_port) as server:
                server.login(self.sender_email, self.password)
                server.sendmail(self.sender_email, to_email, msg.as_string())
        except Exception as e:
            print("EMAIL ERROR:", e)
            raise

