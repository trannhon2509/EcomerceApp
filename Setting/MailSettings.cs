namespace EcomerceApp.Setting
{
    public class MailSettings
    {
        public string? Mail { get; set; }
        public int Port { get; set; }
        public string? DisplayName { get; set; }
        public string? Password { get; set; }
        public string? Host { get; set; }

        public MailSettings(string? mail, string? displayName, string? password, string? host, int port)
        {
            Mail = mail;
            DisplayName = displayName;
            Password = password;
            Host = host;
            Port = port;
        }
    }
}
