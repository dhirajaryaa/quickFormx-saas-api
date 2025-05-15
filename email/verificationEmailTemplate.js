function EmailTemplate({logo_url,username,verification_link,support_email}) {
    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify your email</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f6fb;">
    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding: 40px 0;">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src=${logo_url} alt="QuickFormX" width="40" />
                <h2 style="margin: 16px 0 8px; font-size: 24px; color: #111;">Verify your email</h2>
                <p style="color: #555; font-size: 16px;">Hi ${username}, use the button below to verify your account and get started with QuickFormX.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 0;">
                <a href=${verification_link} style="background-color: #0066ff; color: #fff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 6px;">Verify Email</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`
}
export default EmailTemplate
