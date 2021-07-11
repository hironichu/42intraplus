$(document).ready(() => {
  'use strict';
  let version = chrome.runtime.getManifest().version;
  let theme; 
  let current;
  let level;
  let status; 
  let user; 
  let arr = [];
  let faded = 0;
  let d = new Date(); 
  let month = d.getMonth() + 1; 
  let y = d.getFullYear(); 
  let startday = "00";
  let login = $(".main-navbar-user-nav .dropdown [data-toggle=dropdown] [data-login]").data('login'); 
  let url = `https://profile.intra.42.fr/users/${$('.login').data('login')}/locations_stats.json`; 
  let random_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  status = $(".user-poste-status").text();
  current = (status.search("Available") == 2 ? true:false);
  $("body").attr('style',' ');
  if (typeof $("#logtime_container")[0].classList[2] !== undefined) {
    $("#logtime_container").hide();
  }
  let URL_HASH = window.location.hash.replace('#', '');
  if (current){
      $(`.user-poste-infos`).html(_user_location_($(".user-poste-infos").text(), $('.login').data('login')));
  }
  $("#location-history-clock").click(() => window.location.replace("#last_locations"));
  if (_suburl(true, "profile")) {
    if (check_status() !== false) {
      $(`.page-content.page-content-fluid`).append(_location_history_(login, "private"));
    }
    else{
      $(`.page-content.page-content-fluid`).append(_location_history_(login, "public"));
    }
  }
    theme =  Cookies.get('theme');
    if (theme != null){
      LoadTheme(theme, current);
    }
    else{
      theme = "default";
      LoadTheme(theme, current);
    }
  if(URL_HASH == "last_locations"){
    $('body').css('overflow','hidden');
    window.scrollTo(0, 0);
    $('.last-locations').fadeIn(300);
    $(".page-content>.row").css('filter','blur(5px)');
  }
  $(document).keyup((e) => {
    if (e.keyCode == 27) {
      $(".last-locations").fadeOut(300);
      $('[data-tbaction="close"]').click();
      $(".page-content>.row").css('filter','');
      $('body').css('overflow','');
      window.location.replace("#");
    }
  });
  $("#close-lastlocation").click(() => {
    $(".last-locations").fadeOut(300);
    $(".page-content>.row").css('filter','');
    $('body').css('overflow','');
    window.location.replace("#"); 
  });

  /**
   *
   * Logtime counter and calculator
   *
   */
  if (status !== ""){
    if (check_status() !== false){
      $(".pull-right.button-actions").append(_toolbox_button_());
      $('.page').parent().prepend(_toolbox_(version, theme));
      toolbox_handler($(".pull-right.button-actions"));
      if(URL_HASH === "toolbox"){
        load_toolbox();
      }
    }
    $('body').find("#themechanger").on("change", (e) => {
      let old = theme;
      let _this = e.currentTarget;
      if (theme !== $(_this).val()){
          theme = $(_this).val();
          Cookies.set('theme', $(_this).val(), { expires: 90000,path: '',domain: 'intra.42.fr' });
          $(_this).parents().attr('id', $(_this).val());
          $("#opt_"+old).removeAttr("disabled");
          $("#opt_"+old).removeAttr("selected");
          $("#opt_"+$(_this).val()).attr("disabled","true");
          $("#opt_"+$(_this).val()).attr("selected","true");
          location.reload();
      }
    });
    $(".user-data").append(_logtime_content_(theme, random_id));
    
    const get_logtime = () => {
      $(random_id).html(`<small> <br/>
     <br/>
      <font style="font-size:13pt;"color="orange"></font> <small>`);
      const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
      let n = ((month < 10) ? "0" + month : month);
      let hours = 0;
      let mins = 0;
      let secs = 0;
      let time;
      fetch(url, { method: "GET", credentials: 'include'})
      .then((logtime) => {
        return logtime.json();
      })
      .then((logtime) => {
        let week = d.getDate() - 7;
        let month = week < 0 ? (n - 1) : n;
        month = (month < 10 ) ? "0" + month : month;
        let newdays = daysInMonth(month , y);
        if (week < 0 ) {
          let inew = (week + newdays + 1 );
          for(let tempi = inew;tempi <= newdays;tempi++){
            if (logtime[`${y}-${month}-${tempi}`] === undefined) {
              time = "00:00:00";
            }else{
              time = logtime[`${y}-${(month)}-${tempi}`];
            }
            l.week.swap.push(time.split(':'));
          }
        }
        for (let i = 1;i <= d.getDate();i++) {
          if (i > week) {
            if (logtime[`${y}-${n}-${((i < 10) ? `0${i}` : i)}`] === undefined) {
              time = "00:00:00";
            }else{
              time = logtime[`${y}-${n}-${((i < 10) ? `0${i}` : i)}`];
            }
            l.week.logs.push(time.split(':'));
          }
          if (logtime[`${y}-${n}-${((i < 10) ? `0${i}` : i)}`] === undefined) {
            time = "00:00:00";
          }else{
            time = logtime[`${y}-${n}-${((i < 10) ? `0${i}` : i)}`];
          }
          l.month.logs.push(time.split(':'));
        }
        if (logtime[`${y}-${n}-${((d.getDate() < 10) ? `0${d.getDate()}` : d.getDate())}`] === undefined) {
          time = "00:00:00";
        }else{
          time = logtime[`${y}-${n}-${((d.getDate() < 10) ? `0${d.getDate()}` : d.getDate())}`];
        }
        l.today.logs.push(time.split(':'));
        l.week.logs = l.week.swap.concat(l.week.logs);
        l.goal.logs = l.month.logs;
        l.goal.day =  getDaysInMonthExcludeWE(month, y).length;
        console.log(l.goal.day);
        const _logtime_month_ = calcul_logtime(l.month);
        const _logtime_week_ = calcul_logtime(l.week);
        const _logtime_today_ = calcul_logtime(l.today);
        const _logtime_goal_ = calcul_goaltime(l.goal);/*(daysInMonth * 5) - _logtime_month_;
        /**
         * Logime Variable Set
         * 
         */
        let month_Hourlabel = $("[data-logtime='month'] #hours-ctn");
        let month_Minslabel = $("[data-logtime='month'] #mins-ctn");
        let week_Hourlabel = $("[data-logtime='week'] #hours-ctn");
        let week_Minslabel = $("[data-logtime='week'] #mins-ctn");
        let today_Hourlabel = $("[data-logtime='today'] #hours-ctn");
        let today_Minslabel = $("[data-logtime='today'] #mins-ctn");
        let goal_Hourlabel = $("[data-logtime='goal'] #hours-ctn");
        let goal_Minslabel = $("[data-logtime='goal'] #mins-ctn");
        month_Hourlabel.html(_logtime_month_.hours);
        month_Minslabel.html(_logtime_month_.mins);
        week_Hourlabel.html(_logtime_week_.hours);
        week_Minslabel.html(_logtime_week_.mins);
        today_Hourlabel.html(_logtime_today_.hours);
        today_Minslabel.html(_logtime_today_.mins);
        goal_Hourlabel.html(_logtime_goal_.hours);
        goal_Minslabel.html(_logtime_goal_.mins);
        let month_rt = Date.now();
        let week_rt = month_rt;
        let today_rt = month_rt;
        let goal_rt = month_rt;
        month_rt -= _logtime_month_.hours * 60000 * 60;
        month_rt -= _logtime_month_.mins * 60000;
        month_rt -= _logtime_month_.secs * 1000;
        week_rt -= _logtime_week_.hours * 60000 * 60;
        week_rt -= _logtime_week_.mins * 60000;
        week_rt -= _logtime_week_.secs * 1000;
        today_rt -= _logtime_today_.hours * 60000 * 60;
        today_rt -= _logtime_today_.mins * 60000;
        today_rt -= _logtime_today_.secs * 1000;
        goal_rt -= _logtime_goal_.hours * 60000 * 60;
        goal_rt -= _logtime_goal_.mins * 60000;
        goal_rt -= _logtime_goal_.secs * 1000;
        if (current) {
          setInterval(() => {
            const rt_month_hours = ~~((Date.now() - month_rt) / (60000 * 60));
            const rt_month_mins = ~~((Date.now() - month_rt - (rt_month_hours * 60000 * 60)) /  60000);
            const rt_week_hours = ~~((Date.now() - week_rt) / (60000 * 60));
            const rt_week_mins = ~~((Date.now() - week_rt - (rt_week_hours * 60000 * 60)) /  60000);
            const rt_today_hours = ~~((Date.now() - today_rt) / (60000 * 60));
            const rt_today_mins = ~~((Date.now() - today_rt - (rt_today_hours * 60000 * 60)) /  60000);
            const rt_goal_hours = ~~((Date.now() - goal_rt) / (60000 * 60));
            const rt_goal_mins = ~~((Date.now() - goal_rt - (rt_goal_hours * 60000 * 60)) /  60000);
            month_Hourlabel.html(rt_month_hours);
            month_Minslabel.html(rt_month_mins);
            week_Hourlabel.html(rt_week_hours);
            week_Minslabel.html(rt_week_mins);
            today_Hourlabel.html(rt_today_hours);
            today_Minslabel.html(rt_today_mins);
            goal_Hourlabel.html(rt_goal_hours);
            goal_Minslabel.html(rt_goal_mins);
          }, 60000);
        }
        if (faded === 0) {
            $('#logtime_con').attr('data-vis','show');
            faded = 1;
        }
      }).catch((error) => console.error(error));
    };
    get_logtime();
  }
});
