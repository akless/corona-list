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
          <button type="button" class="btn btn-danger text-nowrap" @click="${onDelete}" ?data-hidden=${!has_initial_values} title="Löscht die Kontaktdaten von diesem Gerät. Für einen QR-Code müssen erst erneut wieder Kontaktdaten eingegeben werden.">Löschen</button>
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
    <div id="guest_qrcode">
      <div id="qrcode"></div>
      <div id="button">
        <button type="button" class="btn btn-primary text-nowrap" @click="${onEdit}">Kontaktdaten editieren</button>
      </div>
    </div>
  `;
}

/**
 * returns the HTML template for showing scanned guest data
 * @param {function} onSave - callback when save button is clicked
 * @param {function} onDiscard - callback when discard button is clicked
 * @param {Object} [guest_data={}] - scanned gust data
 * @returns {TemplateResult} HTML template for showing scanned guest data
 */
export function guestData( onSave, onDiscard, guest_data = {} ) {
  const { date, time, name, adress, tel, email } = guest_data;
  return html`
    <div class="container">
      <h1>Empfangene Daten:</h1>
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">Datum:</th>
            <td>${date}</td>
          </tr>
          <tr>
            <th scope="row">Uhrzeit:</th>
            <td>${time}</td>
          </tr>
          <tr>
            <th scope="row">Name:</th>
            <td>${name}</td>
          </tr>
          <tr>
            <th scope="row">Adresse:</th>
            <td>${adress}</td>
          </tr>
          <tr>
            <th scope="row">Telefon:</th>
            <td>${tel}</td>
          </tr>
          <tr>
            <th scope="row">Email:</th>
            <td>${email}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button type="button" class="btn btn-primary text-nowrap" @click="${onSave}">Speichern</button>
        <button type="button" class="btn btn-danger text-nowrap" @click="${onDiscard}">Verwerfen</button>
      </div>
    </div>
  `;
}

/**
 * return the HTML template that shows all already saved guests data
 * @param {function} onGuestMode - callback when button for guest mode is clicked
 * @param {Object[]} guests_data - all already saved guests data
 * @returns {TemplateResult} HTML template that shows all already saved guests data
 */
export function guestsList( onGuestMode, guests_data ) {
  return html`
    <div class="container">
      <h1>Liste aller Kontaktdaten</h1>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Datum</th>
            <th scope="col">Uhrzeit</th>
            <th scope="col">Name</th>
            <th scope="col">Adresse</th>
            <th scope="col">Telefon</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          ${ repeat( guests_data, guest => guest.key, ( { key, date, time, name, adress, tel, email } ) => html`
            <tr>
              <th scope="row">${key}</th>
              <td>${date}</td>
              <td>${time}</td>
              <td>${name}</td>
              <td>${adress}</td>
              <td>${tel}</td>
              <td>${email}</td>
            </tr>
          `) }
        </tbody>
      </table>
      <div>
        <button type="button" class="btn btn-success text-nowrap" @click="${onGuestMode}">Gastmodus</button>
      </div>
    </div>
  `;
}
