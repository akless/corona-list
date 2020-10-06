/**
 * @overview HTML templates of ccm component for quick questions
 * @author André Kless <andre.kless@web.de> 2020
 */

import { html } from 'https://unpkg.com/lit-html';

/**
 * returns the HTML template for entering guest data
 * @param {function} onConfirm - callback when confirm button is clicked
 * @param {function} onCancel - callback when cancel button is clicked
 * @returns {TemplateResult} HTML template for entering guest data
 */
export function guestForm( onConfirm, onCancel ) {
  return html`
    <table>
      <tr>
        <td><label>Email:</label></td>
        <td><input type="email" name="email"></td>
      </tr>
      <tr>
        <td><label>Tel:</label></td>
        <td><input type="tel" name="tel"></td>
      </tr>
    </table>
    <button @click=${onConfirm}>CONFIRM</button>
    <button @click="${onCancel}">CANCEL</button>
  `;
}

/**
 * returns the HTML template for the QR code of the guest
 * @param {function} onEdit - callback when edit button is clicked
 * @returns {TemplateResult} HTML template for the QR code of the guest
 */
export function guestQrCode( onEdit ) {
  return html`
    <div id="qrcode"></div>
    <button @click="${onEdit}">EDIT</button>
  `;
}

export const table = ( timestamp, secret ) => html`
  <table border="1">
    <tr>
      <th>Timestamp</th>
      <th>Guest Secret</th>
    </tr>
    <tr>
      <td>${timestamp}</td>
      <td>${secret}</td>
    </tr>
  </table>
`;
