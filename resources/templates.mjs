/**
 * @overview HTML templates of ccm component for quick questions
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

import { html } from 'https://unpkg.com/lit-html';

export const input = ( data ) => html`
  <table>
    <tr>
      <td><label>Email:</label></td>
      <td><input type="email"></td>
    </tr>
    <tr>
      <td><label>Tel:</label></td>
      <td><input type="tel"></td>
    </tr>
  </table>
`;