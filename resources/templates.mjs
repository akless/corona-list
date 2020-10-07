/**
 * @overview HTML templates of ccm component for quick questions
 * @author André Kless <andre.kless@web.de> 2020
 */

import { html } from 'https://unpkg.com/lit-html';
import {repeat} from 'https://unpkg.com/lit-html/directives/repeat.js';

/**
 * returns the HTML template for entering guest data
 * @param {function} onSubmit - callback when submit button is clicked
 * @param {function} onCancel - callback when cancel button is clicked
 * @param {function} onDelete - callback when delete button is clicked
 * @param {Object} [initial_values] - initial values for input fields
 * @returns {TemplateResult} HTML template for entering guest data
 */
export function guestForm( onSubmit, onCancel, onDelete, initial_values = {} ) {
  const { name, adress, tel, email } = initial_values;
  const has_initial_values = !!Object.keys( initial_values ).length;
  return html`
    <div class="container">
      <h1>Kontaktdaten</h1>
      <form>
        <div class="form-group">
          <label for="name">Vor-/Nachname:</label>
          <input type="text" class="form-control" id="name" name="name" value="${name||''}" required>
        </div>
        <div class="form-group">
          <label for="adress">Anschrift:</label>
          <input type="text" class="form-control" id="adress" name="adress" value="${adress||''}">
        </div>
        <div class="form-group">
          <label for="tel">Telefon:</label>
          <input type="tel" class="form-control" id="tel" name="tel" value="${tel||''}">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" name="email" value="${email||''}">
        </div>
        <div class="form-group">
          <small>
            Die Kontaktdaten werden nur lokal auf ihrem Gerät gespeichert und niemals an einen Server übertragen.
            Eine Übertragung der Kontaktdaten findet nur durch das Scannen des QR-Codes statt.
          </small>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary text-nowrap" @click=${onSubmit} title="Speichert die Kontaktdaten lokal auf diesem Gerät und erstellt den QR-Code.">Speichern</button>
          <button type="button" class="btn btn-secondary text-nowrap" @click="${onCancel}" ?data-hidden=${!has_initial_values} title="Abbrechen ohne Speichern und zum bisherigen QR-Code zurückkehren.">Abbrechen</button>
          <button type="button" class="btn btn-danger text-nowrap" @click="${onDelete}" ?data-hidden=${!has_initial_values} title="Löscht die Kontaktdaten von diesem Gerät. Für einen QR-Code müssen erst erneut wieder Kontaktdaten eingegeben werden.">Kontaktdaten löschen</button>
        </div>
      </form>
    </div>
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
    <div id="button">
      <button type="button" class="btn btn-primary text-nowrap" @click="${onEdit}">Kontaktdaten editieren</button>
    </div>
  `;
}

/**
 * return the HTML template that shows all scanned guest data
 * @param {Object[]} guests_data - all scanned guest data
 * @returns {TemplateResult} HTML template that shows all scanned guest data
 */
export function restaurantOwnerTable( guests_data ) {
  return html`
    <div class="container">
      <h1>Liste der gescannten Kontaktdaten</h1>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Datum</th>
            <th scope="col">Uhrzeit</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          ${ repeat( guests_data, guest => guest.key, ( { key, date, time, name, adress, tel, email } ) => html`
            <tr>
              <th scope="row">${key}</th>
              <td>${date}</td>
              <td>${time}</td>
              <td>${name}</td>
            </tr>
          `) }
        </tbody>
      </table>
    </div>
  `;
}
