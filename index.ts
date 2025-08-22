const colors = ["Merah", "Kuning", "Hijau", "Pink", "Ungu", "Maroon"];
const apparels = ["Baju", "Celana", "Topi", "Jaket", "Sepatu"];
const labels = ["Diskon", "Sale", "Diskon", "Sale", "Sale"];

const result: string[] = [];

colors.forEach((color, index) => {
  const apparel = apparels[index % apparels.length];
  const eachStatus = labels[index % labels.length];
  result.push(`${apparel} ${color} ${eachStatus}`);
});

console.log(result, "ini restul");
