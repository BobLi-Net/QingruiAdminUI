function getTree() {
    var tree = [
        {
          text: '新闻动态',
          href: '#parent1',
          tags: ['4'],
          nodes: [
            {
              text: '天气预报',
              href: '#child1',
              tags: ['2'],
              nodes: [
                {
                  text: '今日关注',
                  href: '#grandchild1',
                  tags: ['0']
                },
                {
                  text: '栏目调整',
                  href: '#grandchild2',
                  tags: ['0']
                }
              ]
            },
            {
              text: '国内新闻',
              href: '#child2',
              tags: ['0']
            }
          ]
        },
        {
          text: '信息公开',
          href: '#parent2',
          tags: ['0']
        },
        {
          text: '专题专栏',
          href: '#parent3',
           tags: ['0']
        },
        {
          text: '实名制公示',
          href: '#parent4',
          tags: ['0']
        },
        {
          text: '跳转链接',
          href: '#parent5'  ,
          tags: ['0']
        }
      ];
      return tree
}

$(function(){
    $('#cateTree').treeview({
      color: "#444444",
      showBorder:false,
      expandIcon: "fa fa-caret-right",
      collapseIcon: "fa fa-caret-down" ,
      emptyIcon:'fa fa-angle-right', 
      highlightSelected: true,
      backColor:'transparent',
      selectedColor: "black",
      selectedBackColor: "#dddddd",
      data: getTree()
  });

});
