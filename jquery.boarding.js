/*! boarding.js v0.1
 * pokka
 */
(function($){
  $.fn.boarding = function(options){
    var defaults = {
      flash:20,
      letters:["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      concats:[],
      stone_size:8,
      spliter:'',
      after_goal:function(){},
      after_stop:function(){}
    },_$self=this,T;

    var settings=$.extend(defaults, options);

    if(settings.concats.length>0){settings.letters=settings.letters.concat(settings.concats)}

    roll=function(){
        clearTimeout(T);
        var len=settings.letters.length,grooves=[];
        for(var i=0,j=settings.stone_size;i<j;i++){
          grooves.push(settings.letters[[Math.floor(Math.random() * len)]]);
        }

        _$self.text(grooves.join(settings.spliter));

        T = setTimeout(roll,settings.flash);
      };

    goal=function(stone,n){
      clearTimeout(T);
      !n&&(n=0);
      var len=settings.letters.length,grooves=[],board='',tmp='';
      for(var i=n,j=stone.length;i<j;i++){
        tmp = settings.letters[[Math.floor(Math.random() * len)]];
        tmp==stone[n]&&n++;
        grooves.push(tmp);
      }
      board=stone.substring(0,n)+grooves.join(settings.spliter);

      _$self.text(board);

      if(board==stone){
        clearTimeout(T);
        settings.after_goal.call(_$self,board);
      }else{
        T = setTimeout(goal, settings.flash,stone,n);
      }
    };

    this.rock=function(stone){
      if (typeof stone == "string" && stone){
        goal(stone,0);
      }else{
        roll();
      }
    };

    this.hillcrest=function(note){
      clearTimeout(T);
      note&&_$self.text(note);
      settings.after_stop.call(_$self,note);
    };
    return this;
  }
})(jQuery);