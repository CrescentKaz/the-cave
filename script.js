const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4"); 
const text = document.querySelector("#text"); 

const locations = [
  { 
    name: "entrance",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goLargeCavern, goDeadEnd, goDeadEnd, goWin],
    text: "Before you looms the dark, decrepit crags of Mt Feir, so named for the fear it instills upon all who tred it's trecherous terrain. You are a knight tasked by the King and Queen to slay the dragon inhabiting Mt Feir and freeing the people of it's villany. The large gaping maw of the mountain lies to the North of you."
  },
  {
    name: "large cavern",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goUndergroundRiver, goHiddenRoom, goTunnelOfBio, goEntrance],
    text: "You enter a large cavern littered with stalagtites, stalagmites, and columns of various widths. It is dark and dank. The faint scent of muggy decay wafts gently accross the ground. Soft dripping echoes around you as you catch flashes of sunlight reflecting from the falling droplettes."
  },
  {
    name: "hidden room",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goDeadEnd, goLargeCavern, goDeadEnd],
    text: 'You fly up and spot a small alcove to the east. As your feet touch the ground in the alcove you see a tiny engraving on the wall, "Created by Kaitlyn Johnson".'
  },
  {
    name: "tunnel of biolumenence",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goRockWall, goLargeCavern, goDeadEnd, goDeadEnd],
    text: "The tunnel literally glows as biolumenencent algae and cave crawlers line the walls and ceiling. They're mostly teal with some flat pinks and neon yellows. To the East is the large carvern. To the West is a wall of rock where even the algae and critters mostly avoid. You think you spot a few handholds..."
  },
  {
    name: "rock wall",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goDeadEnd, goDragonRoom, goTunnelOfBio],
    text: "You look up and down this section of wall. Large handholds dot the surface at just the right spaces... You think it can take you up into a small twisting tunnel. On the ground and to the South is a soft glowing light at the end of the tunnel."
  },
  {
    name: "underground river",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goOldTracks, goBatCave, goOldCampsite, goLargeCavern], 
    text: "In front of you is a rushing river. Glowing algae light the room. There's a path to the west and to the east, the water is low enough to cross and follow a different path. To the north is a large dropoff where the river forms a waterfall to the ledge below. In the distance you can see a path that follows the river to the north."
  },
  {
    name: "old campsite",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goUndergroundRiver, goDeadEnd, goDeadEnd],
    text: "You find an old campsite with a burnt out firepit, a tattered dusty tent that leans too far to the right, and a few large rocks that might have doubled as stools. Luckily, you don't find any bodies. You do find a small empty knapsack and a book tucked just inside the tent. To the East lies the underground river."
  },
  {
    name: "bat cave",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goDeadEnd, goUndergroundRiver, goDeadEnd],
    text: "You enter a spacous warm cave with lots of high pitched chittering. You look up to see the ceiling absolutely covered in small black bodies. The ground underfoot is a bit mushy. You found a bat cave! To the West awaits the underground river."
  },
  {
    name: "old tracks",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goSortaOldTracks, goDeadEnd, goDeadEnd, goUndergroundRiver],
    text: "Large depressions trail off to the North. You can't tell for certain if they're going towards the north or from the north, but there's only one way to find out. The underground river is to the South if you're too scared."
  },
  {
    name: "sorta old tracks",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goOldCarving, goWeekOldTracks, goBoneRoom, goOldTracks],
    text: "The world gets still and quiet as you track your target. Sweat beads apon your brow and your hair sticks to the sides of your face. Are you ready for this? Did you get enough training? Did you eat enough for breakfast? What if you ate too much? You think the dragon would leave the village alone if you threw up on it? Better not test that... You're at a crossroads in the mountain. You can vaugely make out some sort of carving to the North, the older tracks lie to the South, newer tracks head East and a rancid scent wafts towards you from the West."
  },
  {
    name: "bone room",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goSortaOldTracks, goDeadEnd, goDeadEnd],
    text: "Bones of full 50 men lie strewn about. Some are broken, others whole, and yet others with many many pin-pricks piercing straight through. You think it might be best to go back the way you came."
  },
  {
    name: "old carving",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goDeadEnd, goDeadEnd, goSortaOldTracks],
    text: 'Before you are crude letters carved into the wall of rock. Written in Aramaic, it reads "If you do doubt your courage or your strength come no further. Only he who is valiant and pure of spirit may enter the Cave of Aaaaaargh" ... they must have died while carving it.'
  },
  {
    name: "week old tracks",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDarkRoom, goDeadEnd, goSortaOldTracks, goNewerTracks],
    text: "The air is stale and heavy. A bead of sweat trickles down calf as you peer into the dim light. The tracks deffinately went this way. You guess they might be a week old or so? To the North is a hole in the wall, too dark to see into. The tracks appear to head South, which means West would be further from the dragon."
  },
  {
    name: "dark room",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goDeadEnd, goMiniGame, goWeekOldTracks],
    text: "It is too dark in here to see. To the South you see the hole you just crawled through."
  },
  {
    name: "newer tracks",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goWeekOldTracks, goCavePainting, goFreshTracks, goDeadEnd],
    text: "The air is still a little stale but you catch a whiff of a musky scent. You gently brush your left foot across the edge of one track print. These could only be a few days old. The tracks point off to the West. To the North are the week old tracks."
  },
  {
    name: "cave painting",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goDeadEnd, goNewerTracks, goDeadEnd],
    text: 'You see rust colored smears criss-crossing the wall. They spell out, "ENTER TEXT HERE DEV!" '
  },
  {
    name: "fresh tracks",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goNewerTracks, goTreasureHoard, goDeadEnd],
    text: "You crouch down slowly, mindful of the noise from your armor. Your fingers brush against the easily disturbed ground. These tracks are very fresh, possibly from today, and the pungent odor of lizard musk confirms it. To the East are tracks a few days old. To the west you see the faint glow of what appears to be a rainbow all out of order."
  },
  {
    name: "treasure hoard",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDragonRoom, goFreshTracks, goDeadEnd, goDeadEnd],
    text: "Red, green, blue, purple, yellow, and oragne lights raidiate from all kinds of gems. Gold coins, ingots, and bars overflow from giant chalises and chests. Strings of pearls hang from stalagtites. Shimmering silks swath ornate wraught-silver forms. Sapphires litter the floor like a river and a small stream of rubies and garnets seem to pour out of a pile of emeralds like lava over a lush mountainside. The entire room is a walk-through-able art piece."
  },
  {
    name: "dragon room",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDeadEnd, goDeathBoneRoom, goRockWall, goTreasureHoard],
    text: "You open your eyes to a dimly lit room. A loud snoring makes you jump as you notice a large dark colored dragon asleep right next to you. You have no armor, no weapons, no magic. Your only option is to flee, but to which way? There seems to be an opening to the east. To the south you spot some glinting light and to the west you see a rock wall with what appears to be hand holds."
  },
  {
    name: "dead end",
    "button text": ["N", "E", "W", "S"],
    "button functions": [goDragonRoom, goDragonRoom, goDragonRoom, goDragonRoom],
    text: "You stumble into the wall and hit your head. You pass out from a concusion. Press any direction to continue."
  },
  {
    name: "win",
    "button text": ["N", "E", "W", "S"],
    "button functions": [restart, restart, restart, restart],
    text: "You escaped the dragon! YOU WIN! 🎉 Ending 2 (Press any direction to continue.)"
  },
  {
    name: "mini game",
    "button text": ["1", "0", "3", "2"],
    "button functions": [pickOne, goDarkRoom, pickThree, pickTwo],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win (but don't escape the dragon)! (Press 0 to go back.)"
  },
  {
    name: "death bone room",
    "button text": ["N", "E", "W", "S"],
    "button functions": [restart, restart, restart, restart],
    text: "You slip and slide down a hole onto bones of full 50 men strewn about. Some are broken, others whole, and yet others with many many pin-pricks piercing straight through. Unfortuneately you land on one of these. It is very painful... You Died. ☠️ Ending 1 (Press any Direction to continue.)"
  }
];

// initialize buttons
button1.onclick = goDeadEnd;
button2.onclick = goBoneRoom;
button3.onclick = goRockWall;
button4.onclick = goTreasureHoard;

function update(locations) {
  button1.innerText = locations["button text"][0];
  button2.innerText = locations["button text"][1];
  button3.innerText = locations["button text"][2];
  button4.innerText = locations["button text"][3];
  button1.onclick = locations["button functions"][0];
  button2.onclick = locations["button functions"][1];
  button3.onclick = locations["button functions"][2];
  button4.onclick = locations["button functions"][3];
  text.innerText = locations.text;
}

function goEntrance() {
  update(locations[0]);
}

function goLargeCavern() {
  update(locations[1]);
}

function goHiddenRoom() {
  update(locations[2]);
}

function goTunnelOfBio() {
  update(locations[3]);
}

function goRockWall() {
  update(locations[4]);
}

function goUndergroundRiver() {
  update(locations[5]);
}

function goOldCampsite() {
  update(locations[6]);
}

function goBatCave() {
  update(locations[7]);
}

function goOldTracks() {
  update(locations[8]);
}

function goSortaOldTracks() {
  update(locations[9]);
}

function goBoneRoom() {
  update(locations[10]);
}

function goOldCarving() {
  update(locations[11]);
}

function goWeekOldTracks() {
  update(locations[12]);
}

function goDarkRoom() {
  update(locations[13]);
}

function goNewerTracks() {
  update(locations[14]);
}

function goCavePainting() {
  update(locations[15]);
}

function goFreshTracks() {
  update(locations[16]);
}

function goTreasureHoard() {
  update(locations[17]);
}

function goDragonRoom() {
  update(locations[18]);
}

function goDeadEnd() {
  update(locations[19]);
}

function goWin() {
  update(locations[20]);
}

function goMiniGame() {
  update(locations[21]);
}

function goDeathBoneRoom() {
  update(locations[22]);
}

function pickOne() {
  pick(1);
}

function pickTwo() {
  pick(2);
}

function pickThree() {
  pick(3);
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

function restart() {
  goDragonRoom();
}
