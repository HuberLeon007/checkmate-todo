import * as React from "react";

export default function ResetPasswordEmail({ user, code }) {
  return (
    <div style={{
      fontFamily: 'SF Pro Display, Helvetica Neue, Arial, sans-serif',
      background: '#f5f6fa',
      color: '#111',
      padding: 0,
      margin: 0,
      minHeight: '100vh',
      width: '100%',
    }}>
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ background: '#f5f6fa', padding: '40px 0' }}>
        <tbody>
          <tr>
            <td align="center">
              <table width="480" style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px #0001', padding: 32 }}>
                <tbody>
                  <tr>
                    <td align="center" style={{ paddingBottom: 24 }}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Checkmate" width="48" style={{ marginBottom: 16 }} />
                      <h2 style={{ fontWeight: 700, fontSize: 28, margin: 0, color: '#111' }}>Reset your password</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: 16, color: '#222', paddingBottom: 16, textAlign: 'center' }}>
                      Hi{user ? ` ${user}` : ''},<br />
                      You requested a password reset for your Checkmate account.
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style={{ paddingBottom: 24 }}>
                      <div style={{
                        display: 'inline-block',
                        background: '#f5f6fa',
                        borderRadius: 12,
                        padding: '16px 32px',
                        fontSize: 32,
                        fontWeight: 700,
                        letterSpacing: 4,
                        color: '#111',
                        border: '1px solid #e5e7eb',
                        margin: '16px 0',
                      }}>
                        {code}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: 15, color: '#444', textAlign: 'center', paddingBottom: 16 }}>
                      Enter this code in the app to reset your password.<br />
                      <span style={{ color: '#888', fontSize: 13 }}>If you did not request this, you can ignore this email.</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: 13, color: '#aaa', textAlign: 'center', paddingTop: 16 }}>
                      &copy; {new Date().getFullYear()} Checkmate. All rights reserved.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
