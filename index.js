const canvas = document.getElementById('chartCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 3;

const numSectors = Math.floor(Math.random() * 8) + 1;

// доли и радиусы для секторов
const sectors = [];
let totalFraction = 0;

for (let i = 0; i < numSectors; i += 1) {
  const fraction = Math.random(); // Доля сектора (0 <= fraction <= 1)
  const radiusMultiplier = Math.random(); // Множитель для радиуса (0 <= radiusMultiplier <= 1)
  totalFraction += fraction;
  sectors.push({ fraction, radiusMultiplier });
}

const predefinedColors = [
  '#9B51E0',
  '#2F80ED',
  '#56CCF2',
  '#219653',
  '#F2C94C',
  '#EB5757',
  '#F2994A',
];
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * predefinedColors.length);
  return predefinedColors[randomIndex];
}

// диаграмма
function drawChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let startAngle = -Math.PI / 2; // Начальный угол (12 часов)

  // eslint-disable-next-line no-restricted-syntax
  for (const sector of sectors) {
    const endAngle = startAngle + 2 * Math.PI * sector.fraction;
    const radiusForSector = radius * sector.radiusMultiplier;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radiusForSector, startAngle, endAngle);
    ctx.closePath();

    ctx.fillStyle = getRandomColor();
    ctx.fill();

    startAngle = endAngle;
  }
}
drawChart();

canvas.addEventListener('click', () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const sector of sectors) {
    sector.fraction = Math.random();
    sector.radiusMultiplier = Math.random();
  }
  drawChart();
});
