export function slugify(str: string) {
  str = str.trim();
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim  - from start of text
    .replace(/-+$/, "") // trim - from end of text
    .replace(/-/g, "_");

  return str;
}

export function makeText(str: string) {
  let strArr = str.split("_");

  console.log(strArr);

  return strArr.join(" ");
}
