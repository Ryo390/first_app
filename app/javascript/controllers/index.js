// Import and register all your controllers from the importmap under controllers/*

import { application } from "controllers/application"

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

// Lazy load controllers as they appear in the DOM (remember not to preload controllers in import map!)
// import { lazyLoadControllersFrom } from "@hotwired/stimulus-loading"
// lazyLoadControllersFrom("controllers", application)



  Chart.plugins.register({
    afterDatasetsDraw: function (chart, easing) {
        var ctx = chart.ctx;

        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                    // 値の表示
                    ctx.fillStyle = 'rgb(0, 0, 0,0.8)';//文字の色
                    var fontSize = 12;//フォントサイズ
                    var fontStyle = 'normal';//フォントスタイル
                    var fontFamily = 'Arial';//フォントファミリー
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    var dataString = dataset.data[index].toString();
          
                    // 値の位置
                    ctx.textAlign = 'center';//テキストを中央寄せ
                    ctx.textBaseline = 'middle';//テキストベースラインの位置を中央揃え

                    var padding = 5;//余白
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
    
                });
            }
        });
    }
  });

  
  //=========== 円グラフ ============//
  const sum = nums => nums.reduce((a, x) => a + x);

  $('.chart').on('inview', function(event, isInView) {//画面上に入ったらグラフを描画
    const indexAllBox = document.querySelector("#index_all_box")
    if (!indexAllBox) return;
    
    if (isInView) {
      var ctx=document.querySelectorAll(".chart")[0];//グラフを描画したい場所のid
      const wifes = document.querySelectorAll(".wife");
      const husbands = document.querySelectorAll(".husband");
      let wpercents = []
      let hpercents = []
      wifes.forEach((wife)=>{
        let wpercent = Number(wife.innerHTML)
        wpercents.push(wpercent)
      })

      husbands.forEach((husband)=>{
        let hpercent = Number(husband.innerHTML)
        hpercents.push(hpercent)
      })

      let wsum = sum(wpercents);
      let hsum = sum(hpercents);

      const wifePercentage = Math.round ( wsum / (wsum + hsum) * 100 )
      const husbandPercentage = Math.round (hsum / (hsum + wsum) * 100 )
      // chart.data.datasets[0].data = [wifePercentage, husbandPercentage];
      // chart.update();

      var chart=new Chart(ctx,{
        type:'pie',//グラフのタイプ
        data:{//グラフのデータ
          labels:["妻","夫"],//データの名前
          datasets:[{
            label:"TOTAL",//グラフのタイトル
            backgroundColor:["pink","skyblue"],//グラフの背景色
            data: [wifePercentage, husbandPercentage]//データ
          }]
        },

        options:{//グラフのオプション
          maintainAspectRatio: false,//CSSで大きさを調整するため、自動縮小をさせない
          legend:{
            display:true//グラフの説明を表示
          },
          tooltips:{//グラフへカーソルを合わせた際の詳細表示の設定
            callbacks:{
              label: function (tooltipItem, data) {
                return data.labels[tooltipItem.index]+ ": "+ data.datasets[0].data[tooltipItem.index] + "%";//%を最後につける
              }
            },    
          },
          title:{//上部タイトル表示の設定
            display: true,
            fontSize:10,
            text: '単位：%'
          },
        }
      });
    }
  });