// A central reference to the root jQuery(document)
// jq 处理选择符处理函数
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
   
   /*
     这个正则主要是处理输入的是标签和 id 选择器
	 eg:
	   
	   rquickExpr.exec("<div>sdasdda</div>")  返回的数组 ["<div>sadsad</div>", "<div>sadsad</div>", undefined, index: 0, input: "<div>sadsad</div>"]
	   
	   rquickExpr.exec("#app")  返回的数组  ["#app", undefined, "app", index: 0, input: "#app"]
	 
   */
   
  
    // 选择符处理函数    // 选择器分为 id 和 标签 是直接处理的一类     class 和 其他的是一类
	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)  // 这一步需要你传递合法的选择器
		if ( !selector ) {
			return this;
		}
		
		
		// Method init() accepts an alternate rootjQuery   // 这里的根元素不传递一般指的都是 $(document);
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) { // 选择器是字符串时
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {  // 选择器是<div></div> 一类时的处理方式  当传递的是标签的时候，表示用户需要创建元素

				// Assume that strings that start and end with <> are HTML and skip the regex check
				// 这样子的写法主要是为了跟下面的正则匹配时获得的数组结构一致
				match = [ null, selector, null ];

			} else { // 当你输入的是非标签  这时，如果输入的是 id #app 就会 匹配到 app  ，如果是除了标签和 id 之外的，match = null;
				match = rquickExpr.exec( selector );   //rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,   支持的 id  包括 app  app-aa
				
			}
            // 这里说明一下，match 有可能是 exec 方法的返回值，所以数组的第一项是匹配到得字符串，第二项是如果你输入的是 <div>sdsadsadsad</div>, 那么 match[1] 就是前面的那个
			// 如果你输入的是  id  ，那么 match[2] 就是你输入的 app 这个值
 			// context 一般是 undefind ，因为用户一般不会输入
			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) { // 进到这，说明你输入的是合法的标签和 id 选择符

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {  // 到这，处理的是你输入的是标签的情况
					context = context instanceof jQuery ? context[ 0 ] : context;  // 这里的 context 一般是 undefind，因为你一般不会传递
                    console.log(context);
					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(                            
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );   // 返回创建好的 div 元素 // 这里会将你传入的字符串转化为真正的 dom 元素，并且合并到当前这个元素对象上
                    console.log("jQuery.parseHTML",jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					))
					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}
                    console.log("this",this)
					return this;

				// HANDLE: $(#id)
				} else {
					
					// 进到这里说明 你输入的选择符是 id ，就是用无兼容性的原生 id 选择器去获取相应的元素
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object   将对象处理成 jq 的标准形式
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				console.log("515514")
				console.log("root",root);
				// 除了 id <div> 这类的选择器，都是在这处理
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)  这种是处理用户自己传递 context 的地方
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)  // 处理 document 对象的地方
		} else if ( selector.nodeType ) {
			console.log("elector.nodeType",selector.nodeType)
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function) // 处理 $(function(){}) 的地方 。类似于 $(document).ready(function(){});
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}
         
		return jQuery.makeArray( selector, this );
	};
	
	
	
	
	
	
	
console.log("jQuery.parseHTML",jQuery.parseHTML(
					match[ 1 ],  // <div></div>
					context && context.nodeType ? context.ownerDocument || context : document, // document
					true
				))
	

var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i 
  
  /*
	eg:
      	rsingleTag.exec("<div></div>") ===> ["<div></div>", "div", index: 0, input: "<div></div>"]
  */
   
	
jQuery.parseHTML = function( data, context, keepScripts ) {
	/*
		@params data = "<div></div>"
		@params context = $(document)
		@params keepScripts = true 
	*/
	
	if ( typeof data !== "string" ) { // 要求你输入的是合法的 html 标签字符串
		return [];
	}
	if ( typeof context === "boolean" ) {  // 这里主要是处理用户没有传递 context ，进行函数重构
		// 函数重构，说明 context 没有传递
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {  // 如果你没传递 context 就进入这里处理

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}
    
	// 这一步主要是提取变迁名  如果你输入的是类似 <div> 这样子的标签 ，就会直接提取，如果是 <div>4541555</div>  这里就不能成功提取结果就是 null；
	parsed = rsingleTag.exec( data );  // ["<div></div>", "div", index: 0, input: "<div></div>"]  singleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i 
	scripts = !keepScripts && [];  // false;

	// Single tag  // 如果只是单标签或者简单的标签 eg：<div></div>  <input />;
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];  // 创建上步获得的标签名的标签元素
	}
    // 复杂标签处理
	parsed = buildFragment( [ data ], context, scripts ); // 这一步将你输入的<div>dsadsadas</div> 这样子的字符串转化为真正的 dom 对象  这个函数的具体做法见下面，这里需要说明的是，这个函数的处理最终是有缓存的，所以最终行为和你预期的函数处理是有区别的

	if ( scripts && scripts.length ) {  // 这一步的用途有待证明
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );  // parse 最终是一个 fragment = context.createDocumentFragment() ，它的子元素就是你输入的 标签元素
};
	
/*
   @params elems = ["<div>sdasdsadsa</div>"]
   @params context = $(documtn);
   @params scripts = [];
*/

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length; //  这个length 一般是 1；

	for ( ; i < l; i++ ) {
		elem = elems[ i ]; // 这个一般是你输入的标签 ，eg： <div>sdasdsadsa</div>

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) { // 如果元素是对象，说明你输入的要不是 jq 返回的对象，要不是原生的 dom 对象

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );  // 这种情况只做简单的合并操作

			// Convert non-html into a text node  var rhtml = /<|&#?\w+;/;
			} else if ( !rhtml.test( elem ) ) {  // 这个正则主要是为了检测是不是 html 标签，不是的话就当作文本标签处理
				nodes.push( context.createTextNode( elem ) ); 

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );  // 这一步是在 fragment 中创建了一个包裹的 div ，用来盛放你需要创建的元素

				// Deserialize a standard representation  var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );  ["<div", "div", index: 0, input: "<div>sadsadsd</div>"]
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();  // div  获取标签名 ，支持任意格式的合法标签名
				wrap = wrapMap[ tag ] || wrapMap._default;  // [0,"",""]; 这里是一个内置的处理对象，将一些复杂的标签进行了预处理 ，比如 td option
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ]; //<div>sadsadsd</div>  // 将字符串转换成一个标签的子对象  // 此处是算法精髓

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) { // 这个除非是特殊元素，简单的标签不会进入处理
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );  // 获取子对象，以便在下一步中添加到元素的缓存区  // 这一步是精髓  // 这里是将输入的字符串转换为真是的 dom 对象
                
				// Remember the top-level container
				tmp = fragment.firstChild;  //这一步是获得 fragment 的最外层包裹元素

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";  // 将最外层的包裹元素清空
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = ""; // 将 fragment 清空

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) { // 这里将会把你想要创建的 dom 于是元素真是的放入 fragment 中

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {  // 这里不会进入
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		
		contains = jQuery.contains( elem.ownerDocument, elem ); // false  //elem.ownerDocument 指的是 document  ，这里是验证当前这个元素是不是已经添加在 document 对象下，一般书不在的

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" ); // 这里其实是完成了两步操作，第一步 fragment.appendChild( elem ) ，将你要创建的元素加入到 fragment 中，第二不，检测你创建的元素中是不是有 script 标签

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;  // 最后将包含着你 需要创建的 fragment 返回
}

rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi // 只能匹配 <div /> 这种单标签


//这个函数主要是用来处理用户输入的是 <div> 这种标签的，他会将这种不合法的标签进行合法话，并且会过滤单标签元素，不会对单标签元素进行双标签处理

htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );  // 若不能匹配则返回原字符串  

	}
	
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};	
	
	
	
	
	
	
	
	
	
	
	
	
	