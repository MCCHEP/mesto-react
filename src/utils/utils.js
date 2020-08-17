export const defaultUrl = 'https://mesto.nomoreparties.co';
export const myToken = '072afc53-82e4-4aa4-b920-dd02ed4506a2';
export const myGroup = 'cohort-13';
export const defaultType = 'application/json';

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
