const potionCost = 10;

const characters = [
  {
    name: "Snake Eyes",
    avatar: "🥷",
    race: "human",
    class: "ninja",
    damage: 5,
    health: 100,
    maxHealth: 100,
    level: 1,
    gold: 0,
  },
  {
    name: "Ron Weasley",
    avatar: "🧙‍♂️",
    race: "human",
    class: "wizard",
    damage: 7,
    health: 70,
    maxHealth: 70,
    level: 1,
    gold: 0,
  },
];

const boss = {
  name: "SQUIDWARD",
  avatar: "🐙",
  race: "squid",
  class: "warrior",
  damage: 5,
  health: 200,
  maxHealth: 200,
  level: 1,
  gold: 10,
};

function attackBoss() {
  let damageTotal = 0;
  characters.forEach((character) => {
    damageTotal += character.damage;
  });
  boss.health -= damageTotal;
  if (boss.health <= 0) {
    // boss.health = 0;
    findLoot(boss);
    levelUpBoss();
  }

  drawBossHealth();
}

function drawBossHealth() {
  // @ts-ignore
  document.getElementById("boss-health").innerText = boss.health;
}

function attackCharacters() {
  characters.forEach((character) => {
    character.health -= boss.damage;
    if (character.health <= 0) {
      character.health = 0;
    }
  });
  drawCharacterHealth();

  if (characters.every((character) => character.health === 0)) {
    clearInterval(bossAttackInterval);
  }
}

function drawCharacterHealth() {
  // @ts-ignore
  document.getElementById("snake").innerText = characters[0].health;
  // @ts-ignore
  document.getElementById("ron").innerText = characters[1].health;
}

function levelUpBoss() {
  boss.level++;
  boss.maxHealth += Math.floor(boss.maxHealth * 0.5);
  boss.health = boss.maxHealth;
  if (boss.level % 3 === 0) {
    boss.damage++;
  }
}

function findLoot(foe) {
  let gold = foe.gold * foe.level;
  characters.forEach((character) => {
    character.gold += gold / 2;
    console.log(`${character.name} now has ${character.gold}`);
  });
  drawCharacterGold();
}

function drawCharacterGold() {
  document.getElementById("snake-gold").innerText = characters[0].gold;
  document.getElementById("ron-gold").innerText = characters[1].gold;
}

function buyPotion(customer) {
  let currentCharacter = characters.find(
    (character) => character.avatar === customer
  );
  if (currentCharacter.gold >= potionCost) {
    currentCharacter.gold -= potionCost;
    currentCharacter.health = currentCharacter.maxHealth;
    drawCharacterGold();
    drawCharacterHealth();
  }
}

let bossAttackInterval = setInterval(attackCharacters, 1000);

drawBossHealth();
drawCharacterHealth();
drawCharacterGold();
