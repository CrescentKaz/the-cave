// Need to make the dragon fight interactive. Currently, it's a static; if choose sword = win, etc.

let atk = 0;
let health = 100;
let gold = 1;
let currentWeapon = 0;
let roomCount = 0;
let nothingCount = 0;
let fighting;
let monsterHealth;
let inven = ["Fist"];


const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4"); 
const button5 = document.querySelector("#button5");
const healthText = document.querySelector("#healthText");
const atkText = document.querySelector("#atkText");
const monsterHealthText = document.querySelector("#monsterHealthText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const goldText = document.querySelector("#goldText");
const text = document.querySelector("#text"); 
const picture = document.querySelector("#picture");
const currentRoomText = document.querySelector("#currentRoomText"); 

const weapons = [
  {name: "fist", atk: 1},
  {name: "stick", atk: 2},
  {name: "sword", atk: 20}
];

// still need to add spells to location functions
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
    picture: "./images/The_Cave.PNG"
  },
  {
    name: "largeCavern",
    room: "Large Cavern",
    "button functions": [goUndergroundRiver, goDeadEnd, goTunnelOfBio, goEntrance, goHiddenRoom],
    text: "You enter a large cavern littered with stalagtites, stalagmites, and columns of various widths. It is dark and dank. The faint scent of muggy decay wafts gently accross the ground. Soft dripping echoes around you as you catch flashes of sunlight reflecting from the falling droplettes.",
    picture: "./images/Large_Cavern.PNG"
  },
  {
    name: "hiddenRoom",
    room: "Hidden Room",
    "button functions": [goDeadEnd, goDeadEnd, goLargeCavern, goDeadEnd],
    text: "You fly up and spot a small alcove to the east. As your feet touch the ground in the alcove you see a tiny engraving on the wall, \"Created by Kaitlyn Johnson.\" ",
    picture: "./images/Hidden_Room.PNG"
  },
  {
    name: "tunnelOfBio",
    room: "Tunnel of Bioluminescence",
    "button functions": [goDeadEnd, goLargeCavern, goDeadEnd, goDeadEnd],
    text: "The tunnel literally glows as biolumenencent algae and cave crawlers line the walls and ceiling. They\'re mostly teal with some flat pinks and neon yellows. To the East is the large carvern. Above is a dim golden light. If only there was a way to get up there...",
    picture: "./images/Tunnel_of_Bio.PNG"
  },
  {
    name: "undergroundRiver",
    room: "Underground Stream",
    "button functions": [goOldTracks, goBatCave, goOldCampsite, goLargeCavern], 
    text: "In front of you is a rushing stream. Glowing algae lights the room. There\'s a path to the west and to the east, the water is low enough to follow to the north.",
    picture: "./images/Underground_River.PNG"
  },
  {
    name: "oldCampsite",
    room: "Old Campsite",
    "button functions": [goDeadEnd, goUndergroundRiver, goDeadEnd, goDeadEnd],
    text: "You find an old campsite with a burnt out firepit, a tattered dusty tent that leans too far to the right, and a few large rocks that might have doubled as stools. Luckily, you don\'t find any bodies. You do find a small empty knapsack and a book tucked just inside the tent. To the East lies the underground stream.",
    picture: "./images/Old_Campsite.PNG"
  },
  {
    name: "batCave",
    room: "Bat Cave",
    "button functions": [goDeadEnd, goDeadEnd, goUndergroundRiver, goDeadEnd],
    text: "You enter a spacous warm cave with lots of high pitched chittering. You look up to see the ceiling absolutely covered in small black bodies. The ground underfoot is a bit mushy. You found a bat cave! To the West awaits the underground stream.",
    picture: "./images/Bat_Cave.PNG"
  },
  {
    name: "oldTracks",
    room: "Coin Tracks",
    "button functions": [goSortaOldTracks, goDeadEnd, goDeadEnd, goUndergroundRiver],
    text: "A small coin catches the light and brings your attention to large depressions that trail off to the North. You can\'t tell for certain if they\'re  going towards the north or from the north, but there\'s only one way to find out. The underground stream is to the South if you\'re too scared.",
    picture: "./images/Tracks_Coin.PNG"
  },
  {
    name: "sortaOldTracks",
    room: "Sapphire Tracks",
    "button functions": [goOldCarving, goWeekOldTracks, goBoneRoom, goOldTracks],
    text: "The world gets still and quiet as you track your target. Sweat beads apon your brow and your hair sticks to the sides of your face. Are you ready for this? Did you get enough training? Did you eat enough for breakfast? What if you ate too much? You think the dragon would leave the village alone if you threw up on it? Better not test that... You\'re at a crossroads in the mountain. You can vaugely make out some sort of carving to the North, the coin tracks lie to the South, a pink glint rests in the tracks that head East and a rancid scent wafts towards you from the West.",
    picture: "./images/Tracks_Sapphire.PNG"
  },
  {
    name: "boneRoom",
    room: "Bone Room",
    "button functions": [goDeadEnd, goSortaOldTracks, goDeadEnd, goDeadEnd],
    text: "Bones of full 50 men lie strewn about. Some are broken, others whole, and yet others with many many needle-thin stalagtites poking straight through. You think it might be best to go back the way you came.",
    picture: "./images/Bone_Room.PNG"
  },
  {
    name: "oldCarving",
    room: "Old Carving", 
    "button functions": [goDeadEnd, goDeadEnd, goDeadEnd, goSortaOldTracks],
    text: "Before you are crude letters carved into the wall of rock. Written in Aramaic, it reads \"If you do doubt your courage or your strength come no further. Only he who is valiant and pure of spirit may enter the Cave of Aaaaaargh\" ... they must have died while carving it.",
    picture: "./images/Old_Carving.PNG"
  },
  {
    name: "weekOldTracks",
    room: "Ruby Tracks",
    "button functions": [goDarkRoom, goDeadEnd, goSortaOldTracks, goNewerTracks],
    text: "The air is stale and heavy as you make your way around a curve in the trail. A bead of sweat trickles down your calf and you peer into the dim light. The tracks definitely went this way... did the King and Queen know the dragon could shapeshift...? To the North is a hole in the wall, too dark to see into. The tracks appear to head around to the South. You hope this hasn\'t been a large loop.",
    picture: "./images/Tracks_Ruby.PNG"
  },
  {
    name: "darkRoom",
    room: "Dark Room",
    "button functions": [goDeadEnd, goDeadEnd, goMiniGame, goWeekOldTracks],
    text: "It is too dark in here to see. To the South you see the hole you just crawled through.",
    picture: "./images/Dark_Room.PNG"
  },
  {
    name: "newerTracks",
    room: "Golden Tracks",
    "button functions": [goWeekOldTracks, goCavePainting, goFreshTracks, goDeadEnd],
    text: "The air is still a little stale but you catch a whiff of a musky scent. You gently brush your left foot across the edge of one track print ringed in gold. The tracks point off to the West. You just came from the North.", 
    picture: "./images/Tracks_Gold.PNG"
  },
  {
    name: "cavePainting",
    room: "Cave Painting",
    "button functions": [goDeadEnd, goDeadEnd, goNewerTracks, goDeadEnd],
    text: "You see rust colored smears criss-crossing the wall. They spell out, \"KRONOS\"... some sort of password maybe?",
    picture: "./images/Cave_Painting.PNG"
  },
  {
    name: "freshTracks",
    room: "Fresh Tracks",
    "button functions": [goDeadEnd, goNewerTracks, goTreasureHoard, goDeadEnd],
    text: "You crouch down slowly, mindful of the noise from your armor. Your fingers brush against the easily disturbed ground. These tracks are very fresh, possibly from today, and the pungent odor of lizard musk confirms it. You came from the East. To the west you see the faint glow of what appears to be a rainbow all out of order.",
    picture: "./images/Fresh_Tracks.PNG"
  },
  {
    name: "treasureHoard",
    room: "Treasure Hoard",
    "button functions": [goDragonRoom, goFreshTracks, goDeadEnd, goDeadEnd],
    text: "Red, green, blue, purple, yellow, and orange lights raidiate from all kinds of gems. Gold coins, ingots, and bars overflow from giant chalises and chests. Strings of pearls hang from stalagtites. Shimmering silks swath ornate silver-wraught forms. Sapphires litter the floor like a river and a small stream of rubies and garnets seem to pour out of a pile of emeralds like lava over a lush mountainside. The entire room is a walk-through-able art piece with a path going from East to North.",
    picture: "./images/Treasure_Hoard.PNG"
  },
  { 
    name: "restart",
    room: "Try Again",
    "button functions": [goLargeCavern, goDeathRunAway, goDeathRunAway, goDeathRunAway],
    text: "Before you looms the dark, decrepit crags of Mt Feir, so named for the fear it instills upon all who tred it\'s trecherous terrain. You are a knight tasked by the King and Queen to slay the dragon inhabiting Mt Feir and freeing the people of it\'s villany. The large gaping maw of the mountain lies to the North of you.",
    picture: "./images/The_Cave.PNG"
  },
  {
    name: "dragonRoom",
    room: "Dragon Room",
    "button functions": [goDeadEnd, goDeathBoneRoom, goTunnelOfBio, goTreasureHoard],
    text: "You sneak around the sleeping dragon. Behind you is it\'s treasure hoard. To either side are what kinda look like dark holes? It\'s hard to see in here.",
    picture: "./images/Dragon.PNG"
  },
]; 

const miscLocals = [
  {
    name: "winSword",
    room: "Winner!",
    "button text": ["N", "E", "W", "S"],
    "button functions": [restart, restart, restart, restart],
    text: "You manage to slay the dragon! YOU WIN! 🎉 Ending 1 of 10 (press any direction to continue)",
    picture: "./images/Win_Sword.PNG"
  },
  {
    name: "winFire",
    room: "Winner!", 
    "button text": ["N", "E", "W", "S"],
    "button functions": [restart, restart, restart, restart],
    text: "You incinerate the shapeshifting dragon and almost kill yourself in the process by burning away all the oxygen in the cave! Seriously, might want to rethink that next time... YOU WIN! 🎉 Ending 2 of 10 (press any direction to continue)",
    picture: "./images/Win_Fire.PNG"
  },
  {
    name: "miniGame",
    room: "🤪",
    "button text": ["1", "0", "3", "2"],
    "button functions": [pickOne, goDarkRoom, pickThree, pickTwo],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win (but don\'t escape the dragon)! (Press 0 to go back.)",
    picture: "./images/Mini_Game.PNG"
  },
  {
    name: "fightFrog",
    room: "Fight!",
    "button text": ["A", "B", "C", " "],
    "button functions": [attack, dodge, goDeathRunAway, doNothing],
    text: "A frog has picked a fight with you! What do you do? (A - attack, B - dodge, C - flee)",
    picture: "./images/Frog.PNG"
  },
  {
    name: "fightWorm",
    room: "Fight!",
    "button text": ["A", "B", "C", " "],
    "button functions": [attack, dodge, goDeathRunAway, doNothing],
    text: "A worm has picked a fight with you! What do you do? (A - attack, B - dodge, C - flee, D - ?)",
    picture: "./images/Worm.PNG"
  },
  {
    name: "fightBat",
    room: "Fight!",
    "button text": ["A", "B", "C", " "],
    "button functions": [attack, dodge, goDeathRunAway, doNothing],
    text: "A bat has picked a fight with you! What do you do? (A - attack, B - dodge, C - flee, D - ?)",
    picture: "./images/Bat.PNG"
  },
  {
    name: "fightDragon",
    room: "Fight!",
    "button text": ["A", "B", "C", " "],
    "button functions": [attack, dodge, goDeathRunAway, doNothing],
    text: "You picked a fight with the dragon! What do you do? (A - attack, B - dodge, C - flee, D - ?)",
    picture: "./images/Dragon.PNG"
  },
  {
    name: "dragonRoom",
    room: "Dragon Room",
    "button text": ["Leave", "Fight", "Spell", " "],
    "button functions": [goDragonRoomLeave, goDragonRoomFight, goDragonRoomSpell, doNothing],
    text: "You blink as your eyes adjust to the dimly lit room. A loud snoring makes you jump and you notice a large dark colored dragon asleep right next to you. What do you do?",
    picture: "./images/Dragon.PNG"
  },
  {
    name: "dragonRoomFight",
    room: "Dragon Room",
    "button text": ["Sword", "Stick", "Fist", " "],
    "button functions": [goWinSword, goDeathDragonStick, goDeathDragonFist, doNothing],
    text: "Choose. Your. Weapon!",
    picture: "./images/Dragon.PNG"
  },
  {
    name: "dragonRoomSpell",
    room: "Dragon Room",
    "button text": ["Fly", "Light", "Fire", " "],
    "button functions": [goDeadEnd, , goWinFire, doNothing],
    text: "You ready your new spellbook and pick a spell to cast.",
    picture: "./images/Dragon.PNG"
  },
];
  
const deaths = [
  { 
    name: "boneRoom",
    "button functions": [restart, restart, restart, restart],
    text: "You slip and slide down a hole onto bones of full 50 men strewn about. Some are broken, others whole, and yet others with many many thin stalagmites piercing straight through. Unfortuneately you land on one of these. It is very painful... You Died. ☠️ Ending 3 of 10 (press any direction to continue)",
    picture: "./images/Death_Bone_Room.PNG"
  },
  {
    name: "runAway",
    "button functions": [restart, restart, restart, restart],
    text: "You run away from your duties. You are branded a traitor and banished to the shadowlands! Ending 4 of 10 (press any direction to continue)",
    picture: "./images/Death_Run_Away.PNG"
  },
  {
    name: "takeTreasure",
    "button functions": [restart, restart, restart, restart],
    text: "ENTER TEXT HERE Ending 5 of 10 (press any direction to continue)",
    picture: "./images/Death_Treasure.PNG"
  },
  {
    name: "monsterDidIt",
    "button functions": [restart, restart, restart, restart],
    text: "You died to a cave monster. How shameful... Ending 6 of 10 (press any direction to continue)",
    picture: "./images/Death_Monster.PNG"
  },
  {
    name: "dragonStick",
    "button functions": [restart, restart, restart, restart],
    text: "You attempted to beat the dragon with a stick, while he slept. It did not work out for you. Maybe if you had a horse and a lance... Ending 7 of 10 (press any direction to continue)",
    picture: "./images/Death_Dragon_Stick.PNG"
  },
  {
    name: "dragonFist",
    "button functions": [restart, restart, restart, restart],
    text: "You punched the dragon in his face then bit your lip in pain as your bare knuckles began to ooze blood from the fresh wound. Dragon\'s have ganoid scales on their face so you basically punched a rock covered in sandpaper. The dragon's bose twitches and his eyes fly open, pupils diolated wide. He takes one second to stare at you before eating you whole. You died. Ending 8 of 10 (press any direction to continue)",
    picture: "./images/Death_Dragon_Fist.PNG"
  },
  {
    name: "dragonLost",
    "button functions": [restart, restart, restart, restart],
    text: "After a long a tiresome struggle, you try and try but can\'t seem to hit the thing! The dragon shifts its shape as easily as water flows downhill, causing you to miss repeatedly. You manage to strike it with one solid good thrust only to find your sword now logged between two scales. You kick the hilt, causing some twisted damage. The dragon howls in pain and anger, then begins it\'s counterattack. It lunges at you, teeth barely missing your shoulder. He steps forward and lunges again. This time you roll backwards to avoid it. You don\'t know if your armor can take another blow and don\'t want to risk finding out. The dragon shifts into a large serpent and strikes you fast and true on your exposed cheek. Pain races through your nerves and your eyes lock up at the ceiling. You can\'t move. A roaring waterfall in your ears begins to drown out everything else. Your body crumples to the ground but you can\'t feel it. Can\'t hear it. Soon, you can\'t see the cave ceiling anymore... Ending 9 of 10 (press any direction to continue)",
    picture: "./images/Death_Dragon_Sword.PNG"
  },
  {
    name: "dragonLight",
    "button functions": [restart, restart, restart, restart],
    text: "You take a deep breath than cast the spell. As the words leave your lips you finally realize this might not have been the best idea. The dragon's eyelid flies open and you stare in abject horror as it's pupil dialates a mere second before landing its gaze on you. CHOMP! You get eaten whole for disturbing it's rest. Ending 10 of 10 (press any direction to continue)",
    picture: "./images/No_Image.PNG"
  },
];

// initialize buttons
button1.onclick = goLargeCavern;
button2.onclick = goDeathRunAway;
button3.onclick = goDeathRunAway;
button4.onclick = goDeathRunAway;
button5.onclick = toggleInven;

function updateL(locations) {
  button1.innerText = "N";
  button2.innerText = "E";
  button3.innerText = "W";
  button4.innerText = "S";
  button1.onclick = locations["button functions"][0];
  button2.onclick = locations["button functions"][1];
  button3.onclick = locations["button functions"][2];
  button4.onclick = locations["button functions"][3];
  text.innerText = locations.text;
  picture.src = locations.picture;
  currentRoomText.innerText = locations.room;
}

function updateM(miscLocals) {
  button1.innerText = miscLocals["button text"][0];
  button2.innerText = miscLocals["button text"][1];
  button3.innerText = miscLocals["button text"][2];
  button4.innerText = miscLocals["button text"][3];
  button1.onclick = miscLocals["button functions"][0];
  button2.onclick = miscLocals["button functions"][1];
  button3.onclick = miscLocals["button functions"][2];
  button4.onclick = miscLocals["button functions"][3];
  text.innerText = miscLocals.text;
  picture.src = miscLocals.picture;
  currentRoomText.innerText = miscLocals.room;
}

function updateD(deaths) {
  button1.innerText = "☠️";
  button2.innerText = "☠️";
  button3.innerText = "☠️";
  button4.innerText = "☠️";
  button1.onclick = deaths["button functions"][0];
  button2.onclick = deaths["button functions"][1];
  button3.onclick = deaths["button functions"][2];
  button4.onclick = deaths["button functions"][3];
  text.innerText = deaths.text;
  picture.src = deaths.picture;
  currentRoomText.innerText = "You Died";
}

function goEntrance() {
  updateL(locations[0]);
}

function goLargeCavern() {
  countingRooms();
  updateL(locations[1]);
  if (inven.includes("Spellbook")) {
    button2.innerText = "Fly";
    button2.onclick = locations[1]["button functions"][4];
  }; 
}

function goHiddenRoom() {
  countingRooms();
  updateL(locations[2]);
  alert("you find a hidden room");
}

function goTunnelOfBio() {
  countingRooms();
  updateL(locations[3]);
}

function goUndergroundRiver() {
  countingRooms();
  updateL(locations[4]);
  if (inven.includes("Stick")) {
    alert("cannot aquire stick, already have that");
  } else {
    inven.unshift("Stick");
    alert("aquired stick");
  }
}

function goOldCampsite() {
  countingRooms();
  updateL(locations[5]);
  if (inven.includes("Sword")) {
    alert("cannot aquire sword, already have that");
  } else {
    inven.unshift("Sword");
    alert("aquired sword");
  }
  if (inven.includes("Spellbook")) {
    alert("cannot aquire book, already have that");
  } else {
    inven.push("Spellbook");
    alert("aquired book");
  }
}

function goBatCave() {
  countingRooms();
  updateL(locations[6]);

}

function goOldTracks() {
  countingRooms();
  updateL(locations[7]);

}

function goSortaOldTracks() {
  countingRooms();
  updateL(locations[8]);
}

function goBoneRoom() {
  countingRooms();
  updateL(locations[9]);
}

function goOldCarving() {
  countingRooms();
  updateL(locations[10]);
}

function goWeekOldTracks() {
  countingRooms();
  updateL(locations[11]);
}

function goDarkRoom() {
  countingRooms();
  updateL(locations[12]);
}

function goNewerTracks() {
  countingRooms();
  updateL(locations[13]);
}

function goCavePainting() {
  countingRooms();
  updateL(locations[14]);
}

function goFreshTracks() {
  countingRooms();
  updateL(locations[15]);
}

function goTreasureHoard() {
  countingRooms();
  updateL(locations[16]);
}

function goDragonRoom() {
  updateM(miscLocals[7]);
}

function goDragonRoomLeave() {
  updateL(locations[18]); 
}

function goDragonRoomFight() {
  updateM(miscLocals[8]);
}

function goDragonRoomSpell() {
  updateM(miscLocals[9]);
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
  ]; 
  let whichMessage = Math.floor(Math.random()*deadEnd.length);
  let deadEndMessage = deadEnd[whichMessage];
  alert(deadEndMessage);
}

function goWinSword() {
  updateM(miscLocals[0]);
}

function goWinFire() {
  updateM(miscLocals[1]);
}

function goMiniGame() {
  roomCount = 0;
  updateM(miscLocals[2]);
}

function goFightFrog() {
  updateM(miscLocals[3]);
  alert("monster fight triggered");
}

function goFightWorm() {
  updateM(miscLocals[4]);
  alert("monster fight triggered");
}

function goFightBat() {
  updateM(miscLocals[5]);
  alert("monster fight triggered");
}

function goFightDragon() {
  updateM(miscLocals[6]);
  alert("dragon fight triggered");
}

function goDeathBoneRoom() {
  updateD(deaths[0]);
}

function goDeathRunAway() {
  updateD(deaths[1]);
  alert("you died due to running away");
}

function goDeathTakeTreasure() {
  updateD(deaths[2]);
}

function goDeathMonsterDidIt() {
  updateD(deaths[3]);
}

function goDeathDragonStick() {
  updateD(deaths[4]);
}

function goDeathDragonFist() {
  updateD(deaths[5]);
}

function goDeathDragonLost() {
  updateD(deaths[6]);
}

function countingRooms() { 
  if (roomCount > 2) {
    const monNum = Math.floor((Math.random()*3)+3)
    updateM(miscLocals[monNum]);
  } else {
  roomCount += 1;
  }
}

function doNothing() {
  if (nothingCount > 2) {
    goDeathRunAway();
  } else {
   nothingCount += 1;
  }
}

function pickOne() {
  pick(Math.floor(Math.random()*11));
}

function pickTwo() {
  pick([Math.floor(Math.random()*11), Math.floor(Math.random()*11)]);
}

function pickThree() {
  pick([Math.floor(Math.random()*11), Math.floor(Math.random()*11), Math.floor(Math.random()*11)]);
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
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You feel shame for no real reason!";
    health -= 2;
    healthText.innerText = health;
    if (health < 1) {
      goDeathTakeTreasure();
    }
  }
}

function toggleInven() {
  text.innerText += "\n Current Inventory is:\  ";
  const invenString = inven.join(", ");
  text.innerText += invenString; 
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
// Need to implement a way for the player to choose which weapon they use. I'm thinking of adding more buttons that appear as weapons are added to the inven. Until then, currentWeapon will be the 2 slot. 
  const currentWeapon = 2;
  text.innerText = `The ${monsters[fighting].name} attacks.`; 
  text.innerText += `You attack it with your ${weapons[currentWeapon].name}.`;
  health -= monsters[fighting].level;
  healthText.innerText = health;
  monsterHealth -= weapons[currentWeapon].atk + Math.floor(Math.random());
  monsterHealthText.innerText = monsterHealth; 
  if (health < 1) {
    goDeathMonsterDidIt();
  } else if (monsterHealth < 1) {
    if (fighting === 3) {
      goWinSword();
    } else {
      goKilledMonster();
    }
  }
}

function goKilledMonster() {
  alert("you killed the monster. placing you in ruby tracks");
  goWeekOldTracks(); 
}

function dodge() {
  text.innerText = `You dodged the ${monsters[fighting].name}\'s attack.`;
}

function restart() {
  health = 100;
  atk = 1;
  gold = 1;
  inven = ["Fist"];
  roomCount = 0;
  nothingCount = 0;
  healthText.innerText = health;
  atkText.innerText = atk;
  goldText.innerText = gold;
  updateL(locations[17]);
}
