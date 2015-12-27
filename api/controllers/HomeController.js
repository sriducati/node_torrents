/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  /**
   * `HomeController.All()`
   */
  Index: function (req, res) {
 // res.locals.layout = null;
  return res.view('index');




//console.log(get_monova_links('fun',1));//);
 //return res.view('index',{json: JSON.stringify(get_monova_links('fun',1))});



//return res.view('index',{menus:JSON.st(get_monova_links('fun',1))});
//return res.json(get_monova_links('fun',1));
  },


  /**
   * `HomeController.All()`
   */
   Fetch_Torrentz: function(req, res){
    console.log('https://torrentz.eu/search?f='+req.param('name')+'&p='+req.param('page'));
    res.locals.layout = null;

    var Nightmare = require('nightmare');
    var vo = require('vo');
    var nightmare = new Nightmare({show: false});
    var Torrentz = [];
    vo(function* () {
    var nightmare = new Nightmare();    
    var Torrentz_Eu = yield nightmare
    .goto('https://torrentz.eu/search?f='+req.param('name')+'&p='+req.param('page'))
    .wait()
    .evaluate(function (Torrentz) {
      //return $('.results').find('dl').size();
      $('.results').find('dl').each(function(i,j){
        Torrentz.push({
          url:$(this).find('dt').find('a').attr('href'),
          title:$(this).find('dt').find('a').html(),
          old:$(this).find('dd').find('span').eq(1).find('span').html(),
          size:$(this).find('dd').find('span').eq(3).html(),
          seeds:$(this).find('dd').find('span').eq(4).html(),
          Leechers:$(this).find('dd').find('span').eq(5).html()
        })

      });

      Torrentz.push({page_ignation:$('.results').find('p').find('span').find('a').eq(-3).html()})
      Torrentz.push({total_torrents:$('.results').find('h2').html()})

      return Torrentz;
   
    },Torrentz);
    console.log(Torrentz_Eu);
    return res.json(Torrentz_Eu);
    yield nightmare.close();
    })(function (err, result) {
    if (err) return console.log(err);
    });


   },



   Get_Links: function(req, res){
    //res.locals.layout = null;
    return res.view('links',{site_links:req.param('page_link')});
  },

    Post_Links: function(req, res){
    //console.log(req.param('page_link'));
    res.locals.layout = null;
    var Nightmare = require('nightmare');
    var vo = require('vo');
    var nightmare = new Nightmare({show: false});
    var Torrentz = [];
    vo(function* () {
    var nightmare = Nightmare();    
    var Torrentz_Eu = yield nightmare
    .goto('https://torrentz.eu/'+req.param('name'))
    .evaluate(function (Torrentz) {
      $('.download').find('dl').each(function(i,j){
        Torrentz.push({
          url:$(this).find('dt').find('a').attr('href'),
          url_title:$(this).find('dt').find('a').find('span').eq(0).eq(0).html(),
          title:$(this).find('dt').find('a').find('span').eq(1).html(),

        })

      });
      return Torrentz;
   
    },Torrentz);
    console.log(Torrentz_Eu);
    return res.json(Torrentz_Eu);
    yield nightmare.end();
    })(function (err, result) {
    if (err) return console.log(err);
    });

  },

  Search_Term: function(req, res){
    console.log("hello all");
    res.locals.layout = null;
    var Nightmare = require('nightmare');
    var vo = require('vo');
    var tags = [];
    vo(function* () {
    var nightmare = Nightmare({ show: false });
    var Torrentz_Eu = yield nightmare
    .goto('https://torrentz.eu')
    .type('#thesearchbox', req.param('name'))
    .wait()
    .evaluate(function (tags) {
      $('#thesearchbox').keydown();
      //return tags;
    },tags)
.wait(5000)
      .evaluate(function (tags) {

     // tags.push({url:$(".autocomplete").html()});

      $('.autocomplete').find('li').each(function(i,j){
        tags.push({
          search_title:$(this).html(),
        })

      });

      return tags;
    },tags)
/*         .wait(100000)
    .evaluate(function (tags) {
      if($('ul.autocomplete li').length >= 1)
      {
          $('.autocomplete li').each(function(i)
          {

            tags.push({search:$(this).html()});
            //console.log("good");

          });
          tags.push({url:"sdsds"})
      } else{
        //console.log("bad");
        tags.push({url:"nothing"})
      }

      return tags;
    },tags);*/
      console.log(Torrentz_Eu);
       return res.json(Torrentz_Eu);
    })(function (err, result) {
      if (err) return console.log(err);
     // console.log(result);
    });

  },


  All: function (req, res) {
    return res.json({
      todo: 'All() is not implemented yet!'
    });
  },





  /**
   * `HomeController.Only_One()`
   */
  Only_One: function (req, res) {
    return res.json({
      todo: 'Only_One() is not implemented yet!'
    });
  }
};

