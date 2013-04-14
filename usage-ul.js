/**
 * Copyright (c) 2013, Jérôme Prudent
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *   * Neither the name of the <organization> nor the
 *     names of its contributors may be used to endorse or promote products
 *     derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 * Use of genetoc to generate a table of contents.
 * output is an imbrication of <ul>s and <li>s
 */
(function(){
  
  var id = 0,
      context = {
        parentUl :document.getElementById("toc-js"), // !! REQUIRE you have such an element in your page
        ul : document.createElement("ul")
      },
      
      visitElement = function(node){
        var li, link, toc_link, anchor;
        if(!node.virtual){

          //add an anchor on the element
          anchor = document.createElement("a");
          anchor.id = "genetoc-"+(id++);          
          node.content.parentNode.insertBefore(anchor, node.content);

          // generate the toc line
          li = document.createElement("li");
          link = document.createElement("a");
          link.href = "#" + anchor.id;
          link.id = "toc-" + anchor.id;  
          li.appendChild(link);
          link.innerHTML = node.content.innerHTML;          
          this.ul.appendChild(li);
          
          // add a back link on the element to the toc line 
          toc_link = document.createElement("a");
          toc_link.innerHTML = "toc";
          toc_link.attributes.class = "genetoc-toc-backlink";
          toc_link.href = "#" + link.id;
          node.content.appendChild(toc_link);

        }
      },
      
      visitFirstChild = function(){
        var outer = this,
            ul = document.createElement("ul");
            
        this.parentUl.appendChild(ul);
        
        return {
          parentUl : ul,
          ul : ul
        }
        
      },
  
      visitLastChild = function(){},
      
      //a tree starting at h2 ending at h3
      tree = createTree(1,5);
  
  displayTree(tree,visitElement,visitFirstChild, visitLastChild, context);
  
  console.log(document.getElementById("toc-js").innerHTML);
  
})();
