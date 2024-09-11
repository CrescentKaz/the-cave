// testing if i can create a split

let xp = 0;
let health = 100;
let gold = 0;
let fighting;
let monsterHealth;
let inven = [];
let roomCount = 0;
let nothingCount = 0;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4"); 
const button5 = document.querySelector("#button5");
const healthText = document.querySelector("#healthText");
const atkText = document.querySelector("#atkText");
const text = document.querySelector("#text"); 
const picture = document.querySelector("#picture");
const currentRoomText = document.querySelector("#currentRoomText"); 

const weapons = [
  {name: "fist", atk: 1},
  {name: "stick", atk: 2},
  {name: "sword", atk: 20}
];

const spells = [
  {name: "fire"},
  {name: "fly"},
  {name: "light"}
];

const monsters = [
  {
    name: "Frog",
    level: 2,
    health: 10
  },
  {
    name: "Worm",
    level: 5,
    health: 25
  },
  {
    name: "Bat",
    level: 10,
    health: 50
  },
  {
    name: "Dragon",
    level: 25,
    health: 200
  }
];

const locations = [
  { 
    name: "entrance",
    room: "Entrance",
    "button functions": [goLargeCavern, goDeathRunAway, goDeathRunAway, goDeathRunAway],
    text: "Before you looms the dark, decrepit crags of Mt Feir, so named for the fear it instills upon all who tred it\'s trecherous terrain. You are a knight tasked by the King and Queen to slay the dragon inhabiting Mt Feir and freeing the people of it\'s villany. The large gaping maw of the mountain lies to the North of you.",
    picture: src="./images/the-cave.png"
  },
  {
    name: "largeCavern",
    room: "Large Cavern",
    "button functions": [goUndergroundRiver, goDeadEnd, goTunnelOfBio, goEntrance],
    text: "You enter a large cavern littered with stalagtites, stalagmites, and columns of various widths. It is dark and dank. The faint scent of muggy decay wafts gently accross the ground. Soft dripping echoes around you as you catch flashes of sunlight reflecting from the falling droplettes.",
    picture: src="./images/large-cavern.png"
  },
  {
    name: "hiddenRoom",
    room: "Hidden Room",
    "button functions": [goDeadEnd, goDeadEnd, goLargeCavern, goDeadEnd],
    text: "You fly up and spot a small alcove to the east. As your feet touch the ground in the alcove you see a tiny engraving on the wall, \"Created by Kaitlyn Johnson.\" ",
    picture: src="./images/hidden-room.png"
  },
  {
    name: "tunnelOfBio",
    room: "Tunnel of Bioluminescence",
    "button functions": [goDeadEnd, goLargeCavern, goDeadEnd, goDeadEnd],
    text: "The tunnel literally glows as biolumenencent algae and cave crawlers line the walls and ceiling. They\'re mostly teal with some flat pinks and neon yellows. To the East is the large carvern. Above is a dim golden light. If only there was a way to get up there...",
    picture: src="./images/tunnel-of-bio.png"
  },
  {
    name: "undergroundRiver",
    room: "Underground Stream",
    "button functions": [goOldTracks, goBatCave, goOldCampsite, goLargeCavern], 
    text: "In front of you is a rushing stream. Glowing algae lights the room. There\'s a path to the west and to the east, the water is low enough to follow to the north.",
    picture: src="./images/underground-river.png"
  },
  {
    name: "oldCampsite",
    room: "Old Campsite",
    "button functions": [goDeadEnd, goUndergroundRiver, goDeadEnd, goDeadEnd],
    text: "You find an old campsite with a burnt out firepit, a tattered dusty tent that leans too far to the right, and a few large rocks that might have doubled as stools. Luckily, you don\'t find any bodies. You do find a small empty knapsack and a book tucked just inside the tent. To the East lies the underground stream.",
    picture: src="./images/old-campsite.png"
  },
  {
    name: "batCave",
    room: "Bat Cave",
    "button functions": [goDeadEnd, goDeadEnd, goUndergroundRiver, goDeadEnd],
    text: "You enter a spacous warm cave with lots of high pitched chittering. You look up to see the ceiling absolutely covered in small black bodies. The ground underfoot is a bit mushy. You found a bat cave! To the West awaits the underground stream.",
    picture: src="./images/bat-cave.png"
  },
  {
    name: "oldTracks",
    room: "Coin Tracks",
    "button functions": [goSortaOldTracks, goDeadEnd, goDeadEnd, goUndergroundRiver],
    text: "A small coin catches the light and brings your attention to large depressions that trail off to the North. You can\'t tell for certain if they\'re  going towards the north or from the north, but there\'s only one way to find out. The underground stream is to the South if you\'re too scared.",
    picture: src="./images/coin-tracks.png"
  },
  {
    name: "sortaOldTracks",
    room: "Sapphire Tracks",
    "button functions": [goOldCarving, goWeekOldTracks, goBoneRoom, goOldTracks],
    text: "The world gets still and quiet as you track your target. Sweat beads apon your brow and your hair sticks to the sides of your face. Are you ready for this? Did you get enough training? Did you eat enough for breakfast? What if you ate too much? You think the dragon would leave the village alone if you threw up on it? Better not test that... You\'re at a crossroads in the mountain. You can vaugely make out some sort of carving to the North, the coin tracks lie to the South, a pink glint rests in the tracks that head East and a rancid scent wafts towards you from the West.",
    picture: src="./images/sapphire-tracks.png"
  },
  {
    name: "boneRoom",
    room: "Bone Room",
    "button functions": [goDeadEnd, goSortaOldTracks, goDeadEnd, goDeadEnd],
    text: "Bones of full 50 men lie strewn about. Some are broken, others whole, and yet others with many many needle-thin stalagtites poking straight through. You think it might be best to go back the way you came.",
    picture: src="./images/bone-room.png"
  },
  {
    name: "oldCarving",
    room: "Old Carving", 
    "button functions": [goDeadEnd, goDeadEnd, goDeadEnd, goSortaOldTracks],
    text: "Before you are crude letters carved into the wall of rock. Written in Aramaic, it reads \"If you do doubt your courage or your strength come no further. Only he who is valiant and pure of spirit may enter the Cave of Aaaaaargh\" ... they must have died while carving it.",
    picture: src="./images/old-carving.png"
  },
  {
    name: "weekOldTracks",
    room: "Ruby Tracks",
    "button functions": [goDarkRoom, goDeadEnd, goSortaOldTracks, goNewerTracks],
    text: "The air is stale and heavy as you make your way around a curve in the trail. A bead of sweat trickles down your calf and you peer into the dim light. The tracks deffinately went this way... did the King and Queen know they dragon could shapeshift...? To the North is a hole in the wall, too dark to see into. The tracks appear to head around to the South. You hope this hasn\'t been a large loop.",
    picture: src="./images/ruby-tracks.png"
  },
  {
    name: "darkRoom",
    room: "Dark Room",
    "button functions": [goDeadEnd, goDeadEnd, goMiniGame, goWeekOldTracks],
    text: "It is too dark in here to see. To the South you see the hole you just crawled through.",
    picture: src="./images/dark-room.png"
  },
  {
    name: "newerTracks",
    room: "Golden Tracks",
    "button functions": [goWeekOldTracks, goCavePainting, goFreshTracks, goDeadEnd],
    text: "The air is still a little stale but you catch a whiff of a musky scent. You gently brush your left foot across the edge of one track print ringed in gold. The tracks point off to the West. You just came from the North.", 
    picture: src="./images/golden-tracks.png"
  },
  {
    name: "cavePainting",
    room: "Cave Painting",
    "button functions": [goDeadEnd, goDeadEnd, goNewerTracks, goDeadEnd],
    text: "You see rust colored smears criss-crossing the wall. They spell out, \"KRONOS\"... some sort of password maybe?",
    picture: src="./images/cave-painting.png"
  },
  {
    name: "freshTracks",
    room: "Fresh Tracks",
    "button functions": [goDeadEnd, goNewerTracks, goTreasureHoard, goDeadEnd],
    text: "You crouch down slowly, mindful of the noise from your armor. Your fingers brush against the easily disturbed ground. These tracks are very fresh, possibly from today, and the pungent odor of lizard musk confirms it. You came from the East. To the west you see the faint glow of what appears to be a rainbow all out of order.",
    picture: src="./images/fresh-tracks.png"
  },
  {
    name: "treasureHoard",
    room: "Treasure Hoard",
    "button functions": [goDragonRoom, goFreshTracks, goDeadEnd, goDeadEnd],
    text: "Red, green, blue, purple, yellow, and orange lights raidiate from all kinds of gems. Gold coins, ingots, and bars overflow from giant chalises and chests. Strings of pearls hang from stalagtites. Shimmering silks swath ornate silver-wraught forms. Sapphires litter the floor like a river and a small stream of rubies and garnets seem to pour out of a pile of emeralds like lava over a lush mountainside. The entire room is a walk-through-able art piece with a path going from East to North.",
    picture: src="./images/treasure-hoard.png"
  },
  {
    name: "dragonRoom",
    room: "Dragon Room",
    "button functions": [goDeadEnd, goDeathBoneRoom, goRockWall, goTreasureHoard],
    text: "You blink as your eyes adjust to the dimly lit room. A loud snoring makes you jump and you notice a large dark colored dragon asleep right next to you. What do you do?",
    picture: src="./images/dragon-room.png"
  },
]; 

const miscLocals = [
  {
    name: "winSword",
    room: "Winner!",
    "button text": ["N", "E", "W", "S"],
    "button functions": [restart, restart, restart, restart],
    text: "You manage to slay the dragon! YOU WIN! 🎉 Ending 1 of 10 (press any direction to continue)",
    picture: src="./images/.png"
  },
  {
    name: "winFire",
    room: "Winner!", 
    "button text": ["N", "E", "W", "S"],
    "button functions": [restart, restart, restart, restart],
    text: "You incinerate the shapeshifting dragon and almost kill yourself in the process by burning away all the oxygen in the cave! Seriously, might want to rethink that next time... YOU WIN! 🎉 Ending 2 of 10 (press any direction to continue)",
    picture: src="./images/.png"
  },
  {
    name: "miniGame",
    room: "🤪",
    "button text": ["1", "0", "3", "2"],
    "button functions": [pickOne, goDarkRoom, pickThree, pickTwo],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win (but don\'t escape the dragon)! (Press 0 to go back.)",
    picture: src="./images/.png"
  },
  {
    name: "fightFrog",
    room: "Fight!",
    "button text": ["A", "B", "C", " "],
    "button functions": [fight, dodge, goDeathRunAway, doNothing],
    text: "A frog has picked a fight with you! What do you do? (A - attack, B - dodge, C - flee)",
    picture: src="./images/frog.png"
  },
  {
    name: "fightWorm",
    room: "Fight!",
    "button text": ["A", "B", "C", " "],
    "button functions": [fight, dodge, goDeathRunAway, doNothing],
    text: "A worm has picked a fight with you! What do you do? (A - attack, B - dodge, C - flee, D - ?)",
    picture: src="./images/worm.png"
  },
  {
    name: "fightBat",
    room: "Fight!",
    "button text": ["A", "B", "C", " "],
    "button functions": [fight, dodge, goDeathRunAway, doNothing],
    text: "A bat has picked a fight with you! What do you do? (A - attack, B - dodge, C - flee, D - ?)",
    picture: src="./images/.png"
  },
  {
    name: "fightDragon",
    room: "Fight!",
    "button text": ["A", "B", "C", " "],
    "button functions": [fight, dodge, goDeathRunAway, doNothing],
    text: "The dragon has picked a fight with you! What do you do? (A - attack, B - dodge, C - flee, D - ?)",
    picture: src="./images/.png"
  },
];
  
const deaths = [
  { 
    name: "boneRoom",
    text: "You slip and slide down a hole onto bones of full 50 men strewn about. Some are broken, others whole, and yet others with many many thin stalagmites piercing straight through. Unfortuneately you land on one of these. It is very painful... You Died. ☠️ Ending 3 of 10 (press any direction to continue)",
    picture: src="./images/.png"
  },
  {
    name: "runAway",
    text: "You run away from your duties. You are branded a traitor and banished to the shadowlands! Ending 4 of 10 (press any direction to continue)",
    picture: src="./images/.png"
  },
  {
    name: "takeTreasure",
    text: "ENTER TEXT HERE Ending 5 of 10 (press any direction to continue)",
    picture: src="./images/.png"
  },
  {
    name: "monsterDidIt",
    text: "You died to a cave monster. How shameful... Ending 6 of 10 (press any direction to continue)",
    picture: src="./images/.png"
  },
  {
    name: "dragonStick",
    text: "You attempted to beat the dragon with a stick, while he slept. It did not work out for you. Maybe if you had a horse and a lance... Ending 7 of 10 (press any direction to continue)",
    picture: src="./images/.png"
  },
  {
    name: "dragonFist",
    text: "You punched the dragon in his face then bit your lip in pain as your bare knuckles began to ooze blood from the fresh wound. Dragon\'s have ganoid scales on their face so you basically punched a rock covered in sandpaper. The dragon's bose twitches and his eyes fly open, pupils diolated wide. He takes one second to stare at you before eating you whole. You died. Ending 8 of 10 (press any direction to continue)",
    picture: src="./images/.png"
  },
  {
    name: "dragonLost",
    text: "After a long a tiresome struggle, you try and try but can\'t seem to hit the thing! The dragon shifts its shape as easily as water flows downhill, causing you to miss repeatedly. You manage to strike it with one solid good thrust only to find your sword now logged between two scales. You kick the hilt, causing some twisted damage. The dragon howls in pain and anger, then begins it\'s counterattack. It lunges at you, teeth barely missing your shoulder. He steps forward and lunges again. This time you roll backwards to avoid it. You don\'t know if your armor can take another blow and don\'t want to risk finding out. The dragon shifts into a large serpent and strikes you fast and true on your exposed cheek. Pain races through your nerves and your eyes lock up at the ceiling. You can\'t move. A roaring waterfall in your ears begins to drown out everything else. Your body crumples to the ground but you can\'t feel it. Can\'t hear it. Soon, you can\'t see the cave ceiling anymore... Ending 9 of 10 (press any direction to continue)",
    picture: src="./images/.png"
  }
];

if roomCount > 3 {
  update(miscLocals[Math.floor(Math.random()*3)];
  roomCount = 0;
}

// initialize buttons
button1.onclick = goLargeCavern;
button2.onclick = goDeathRunAway;
button3.onclick = goDeathRunAway;
button4.onclick = goDeathRunAway;
button5.onclick = toggleInven;

function update(locations) {
  button1.onclick = locations["button functions"][0];
  button2.onclick = locations["button functions"][1];
  button3.onclick = locations["button functions"][2];
  button4.onclick = locations["button functions"][3];
  text.innerText = locations.text;
  picture.innerText = locations.picture;
  currentRoomText.innerText = locations.room;
}

function update(miscLocals) {
  button1.innerText = miscLocals["button text"][0];
  button2.innerText = miscLocals["button text"][1];
  button3.innerText = miscLocals["button text"][2];
  button4.innerText = miscLocals["button text"][3];
  button1.onclick = miscLocals["button functions"][0];
  button2.onclick = miscLocals["button functions"][1];
  button3.onclick = miscLocals["button functions"][2];
  button4.onclick = miscLocals["button functions"][3];
  text.innerText = miscLocals.text;
  picture.innerText = miscLocals.picture;
  currentRoomText.innerText = miscLocals.room;
}

function update(deaths) {
  button1.innerText = "☠️";
  button2.innerText = "☠️";
  button3.innerText = "☠️";
  button4.innerText = "☠️";
  button1.onclick = restart();
  button2.onclick = restart();
  button3.onclick = restart();
  button4.onclick = restart();
  text.innerText = deaths.text;
  picture.innerText = deaths.picture;
  currentRoomText.innerText = "You Died";
}

function goEntrance() {
  update(locations[0]);
  inven.push(weapons.slice(,-3));
}

function goLargeCavern() {
  update(locations[1]);
  if "book" in inven {
    button2.innerText = "Fly";
    button2.onclick = goHiddenRoom();
  } else {
  };
}

function goHiddenRoom() {
  update(locations[2]);
}

function goTunnelOfBio() {
  update(locations[3]);
}

function goUndergroundRiver() {
  update(locations[4]);
  if weapons[1] not in inven {
    inven.push(weapons[1])};
}

function goOldCampsite() {
  update(locations[5]);
  if "book" not in inven {
    inven.push("book")};
  if weapons[2] not in inven {
    inven.push(weapons[2])};
}

function goBatCave() {
  update(locations[6]);
}

function goOldTracks() {
  update(locations[7]);
}

function goSortaOldTracks() {
  update(locations[8]);
}

function goBoneRoom() {
  update(locations[9]);
}

function goOldCarving() {
  update(locations[10]);
}

function goWeekOldTracks() {
  update(locations[11]);
}

function goDarkRoom() {
  update(locations[12]);
}

function goNewerTracks() {
  update(locations[13]);
}

function goCavePainting() {
  update(locations[14]);
}

function goFreshTracks() {
  update(locations[15]);
}

function goTreasureHoard() {
  update(locations[16]);
}

function goDragonRoom() {
  update(locations[17]);
}

function goDeadEnd() {
  const deadEnd = [
    "You can't go this way!",
    "You wouldn't want to hit your head!",
    'You feel like if this wall could talk it would say, "You shall not pass!" ',
    "This doesn't lead anywhere!",
    "No! Surely not that way!",
    "Just because you're facing a rock doesn't mean they can't see you!", 
    "Yes, I agree. Staring at a wall is a perfectly good waste of time!", 
    "You are not being paid by the hour. Maybe try a different direction!",
    "Do you ever think about why we're here?",
    "There is no map on this wall."
  ]
  alert(deadEnd[Math.floor(Math.random()*deadEnd.length())]);
}

function goWinSword() {
  update(miscLocals[0]);
}

function goWinFire() {
  update(miscLocals[1]);
}

function goMiniGame() {
  update(miscLocals[2]);
}

function goFightFrog() {
  update(miscLocals[3]);
}

function goFightWorm() {
  update(miscLocals[4]);
}

function goFightBat() {
  update(miscLocals[5]);
}

function goFightDragon() {
  update(miscLocals[6]);
}

function goDeathBoneRoom() {
  update(deaths[0]);
}

function goDeathRunAway() {
  update(deaths[1]);
}

function goDeathTakeTreasure() {
  update(deaths[2]);
}

function goDeathMonsterDidIt() {
  update(deaths[3]);
}

function goDeathDragonStick() {
  update(deaths[4]);
}

function goDeathDragonFist() {
  update(deaths[5]);
}

function goDeathDragonLost() {
  update(deaths[6]);
}

function doNothing() {
 nothingCount += 1;
  if nothingCount > 3 {
    goDeathRunAway();
  } else {
  };
}

function pickOne() {
  let numPickOne = Math.floor(Math.random()*11);
}

function pickTwo() {
  let numPickTwo = [Math.floor(Math.random()*11), Math.floor(Math.random()*11)];
}

function pickThree() {
  let numPickThree = [Math.floor(Math.random()*11), Math.floor(Math.random()*11), Math.floor(Math.random()*11)];
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Correct! You win 20 imaginary gold!";
  } else {
    text.innerText += "Wrong! You feel shame for no real reason!";
  }
}

function toggleInven() {
  text.innerText += "\n";
  for (let i = 0; i < inven.length + 1; i++) {
    text.innerText += (inven[i] + " ");
  }
}

function fightFrog() {
  fighting = 0;
  goFight();
}

function fightWorm() {
  fighting = 1;
  goFight();
}

function fightBat() {
  fighting = 2;
  goFight();
}

function fightDragon() {
  fighting = 3;
  goFight();
}

function goFight() {
  monsterHealth = monsters[fighting].health;
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth; 
  monsterStats.style.display = "block";
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks."; 
  text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons]currentWeapons].power + Math.floor(Math.random()
    }
}

function dodge() {}

function restart() {
  goEntrance();
}
