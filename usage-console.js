/**
 * Use of genetoc to generate a table of contents in console
 */
(function(){
  var tree = createTree(2,7);
  displayTree(tree,
              function(item){
                var i,spaces = "";
                
                if(item.virtual) return;
                
                for(i=0; i<item.level; i++){
                  spaces = spaces + "*";
                }
                console.log(spaces + item.content.innerHTML);
              });
})();
