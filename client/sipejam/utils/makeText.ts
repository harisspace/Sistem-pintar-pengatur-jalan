export function makeText(str: string) {
  let strArr = str.split("_");

  console.log(strArr);

  return strArr.join(" ");
}
