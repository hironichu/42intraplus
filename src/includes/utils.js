const color_sel = (theme, sel) =>
{
  switch (theme) {
    case "default" :
      switch (sel)
      {
        case 1 :
          return ("#bf2a04");
        case 2 :
          return ("#efc10b");
        case 3 :
          return ("#06bdf9");
        case 4 :
          return ("#f95806");
        case 5 :
          return ("#a3f906");
      }
    break;
    case "dark" :
      switch (sel)
      {
        case 1 :
          return ("#bf2a04");
        case 2 :
          return ("#efc10b");
        case 3 :
          return ("#06bdf9");
        case 4 :
          return ("#f95806");
        case 5 :
          return ("#a3f906");
      }
    break;
    case "red" :
      switch (sel)
      {
        case 1 :
          return ("#bf2a04");
        case 2 :
          return ("#efc10b");
        case 3 :
          return ("#06bdf9");
        case 4 :
          return ("#f95806");
        case 5 :
          return ("#a3f906");
      }
    break;
    case "green" :
      switch (sel)
      {
        case 1 :
          return ("#bf2a04");
        case 2 :
          return ("#efc10b");
        case 3 :
          return ("#06bdf9");
        case 4 :
          return ("#f95806");
        case 5 :
          return ("#a3f906");
      }
    break;
    default :
      //
    break;
  }
};
/**
 * @name getcolor
 * @description Return a color depending on the meme
 *
 * @param {int} hours
 */
const getcolor = (hours, theme) => {
    if (hours > 0 && hours <= 35){
        return (color_sel(theme, 1));
    }
    else if (hours >= 35 && hours <= 70){
        return (color_sel(theme, 2));
    }
    else if (hours >= 70 && hours <= 105){
        return (color_sel(theme, 3));
    }
    else if (hours >= 105 && hours <= 140){
        return (color_sel(theme, 4));
    }
    else if (hours > 140){
        return (color_sel(theme, 5));
    }
    else{
        return ("white");
    }
};
/**
 *
 * @name getmeme
 * @param {int} hours
 * @description Return a meme
 *
 */
const getmeme = (hours) => {

};
/**
 *
 * @name hours_id
 * @param {int} hours
 * @description Return a meme
 *
 */
const hours_id = (hours) => {
  let i = -1;
  for (count = 0; count <= 165;count += 10) {
    i++;
  }
  return (i);
};
/**
 * 
 * @param {*} th 
 * @param {*} tm 
 * @param {*} r 
 * @param {*} g 
 * @param {*} b 
 * @param {*} theme 
 */
const checker = (th, tm, r,g,b, theme) => {
  if (th <= 1)
  {
    b += 15 + Math.abs(tm / 2);
    g += 15 + Math.abs(tm / 4);
    r += 15;
  }
  else if (th >= 1 && th <= 2)
  {
    b += 22 + Math.abs(tm / 2);
    g += 17;
  }
  else if (th >= 2 && th <= 3)
  {
    b += 37 + Math.abs(tm / 2);
    g += 18;
  }
  else if (th >= 3 && th <= 4)
  {
    b += 40 + Math.abs(tm / 2);
    g += 19;
  }
  else if (th >= 4 && th <= 5)
  {
    b += 50 + Math.abs(tm / 2);
    g += 20;
  }
  else if (th >= 5 && th <= 7){
    b += 60 + Math.abs(tm / 5);
    g += 34;
  }
  else if (th >= 7 && th <= 9){
    b += 70 + Math.abs(tm / 5);
    g += 41;
  }
  else if (th >= 9 && th <= 11){
    b += 80 + Math.abs(tm / 5);
    g += 30;
  }
  else if (th >= 11 && th < 13){
    b += 90 + Math.abs(tm / 5);
    g += 61;
  }
  else if (th >= 13 && th < 14){
    b += 105;
    g += 62;
    r += 15;
  }
  else if (th >= 14 && th < 15){
    b += 119;
    g += 62;
    // r += 50;
  }
  else if (th >= 15 && th < 17){
    b += 125;
    g += 64;
    r += 11;
  }
  else if (th >= 17 && th <= 19){
    b += 145;
    g += 75;
    r += 10;
  }
  else if (th >= 19 && th <= 21){
    b += 155;
    g += 85;
    r += 35;
  }
  else if (th >= 21){
    b += 175;
    g += 98;
    r += 45;
  }
  else{
    r = 0;
    g = 0;
    b = 0;
  }
  let arr = [r,g,b];
  return arr;
};

const check_status = () => {
  let i = 0;
  let user_try = [];
  $("[data-login]").each((e,k) => {
      user_try.push($(k).text().replace(/\n/g, ''));
      i++;
  });
  if (i === 2){
      if (user_try[0].substring(user_try[0].indexOf(" ") + 1) == user_try[1].substring(user_try[1].indexOf(" ") + 1)){
        return ($("[data-login]").data('login'));
      }
      else{
        return (false);
      }
  }else{
    return (false);
  }
};
const check_overwrite = (cc, random_id) => {
  if (cc.overwrite_username !== "") {
    if ($('.name span').length === 0) {
      $('.name').html(`${cc.overwrite_username}`);
    }
    else {
      $('.name span').html(`${cc.overwrite_username}`);
    }
  }
  if (cc.overwrite_phrase !== ""){
    // $(random_id).remove();
    $(random_id).append(cc);
  }
  if (cc.custom_img !== "0"){
    if (cc.custom_img_url !== null){
      $(`.user-image`).css(`background-image`, `url(${cc.custom_img_url}`);
    }
  }
  if (parseInt(cc.custom_audio) === 1) {
    if (cc.custom_audio_url !== ""){
      let audio = new Audio(cc.custom_audio_url);
      audio.volume = parseFloat(cc.custom_audio_vol);
      audio.loop = parseInt(cc.custom_audio_loop);
      audio.play();
    }
  }
};
/**
 * 
 * @param {*} cc 
 * @param {*} lvl 
 */
const update_lvl = (cc,lvl) => console.log(lvl);

/**
 * 
 * 
 */

let l = {
  month:{
    hours:0,
    mins:0,
    secs:0,
    logs: []
  },
  week:{
    hours:0,
    mins:0,
    secs:0,
    logs: [],
    swap:[]
  },
  today:{
    hours:0,
    mins:0,
    secs:0,
    logs: []
  },
  goal:{
    hours:0,
    mins:0,
    secs:0,
    logs: [],
    day:0
  }
}

/**
 * 
 * @param {*} spe 
 */
const   calcul_logtime = (spe) => {
   // console.log(spe);
  spe.logs.forEach((v, k) => {
    spe.hours += parseInt(spe.logs[k][0]);
    spe.mins += parseInt(spe.logs[k][1]);
    spe.secs += parseInt(spe.logs[k][2]);
  });
  spe.mins += parseInt(spe.secs / 60);
  spe.hours += parseInt(spe.mins / 60);
  spe.mins %= 60;
  spe.secs %= 60;
  return spe;
};

/**
 * 
 * @param {*} spe 
 */
const   calcul_goaltime = (spe) => {
  // console.log(spe.logs);
  spe.mins += parseInt((l.goal.day * 7 * 60) - l.month.mins + (l.month.hours * 60));
  spe.hours +=  parseInt((l.goal.day * 7) - l.month.hours);
  spe.mins %= 60;
  spe.secs %= 60;
  return spe;
};

function getDaysInMonthExcludeWE(month, year) {
  month--; 
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
      var tmpDate = new Date(date);            
      var weekDay = tmpDate.getDay(); 
      var day = tmpDate.getDate(); 
      if (weekDay%6) { 
          days.push(day);
      }
      date.setDate(date.getDate() + 1);
  }

  return days;
} 