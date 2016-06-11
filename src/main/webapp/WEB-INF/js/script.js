
<script>
	
	/*
	 * sqr=^,root=$;
	 */
		var last=0;
		var count=-1;
		var ans_found=0;
		var priority = {};
		
		priority['r']=5;
		priority['f']=5;
		priority['c']=5;
		priority['C']=5;		
		priority['t']=5;				
		priority['l']=5;				
		priority['L']=5;
		priority['s']=5;
		priority['+']=2;
		priority['-']=2;
		priority['*']=4;
		priority['/']=4;
		priority['^']=5;
		priority['%']=5;		
		priority['(']=0;
		
		function viewvalue(value){
			
			var element= document.getElementById('screen');
			element.focus();
    			
			// finding result .
			if(value=='='){
				var ans=calculate(document.getElementById("screen").value);
				document.getElementById("screen").value = ans;	
				return ;
			}
					
			// clear the screen
			if(value=='CE'){
				document.getElementById("screen").value = "";
				return ;
			}
			
			var math_op1=new Array('root','floor','ceil','sin','cos','tan','log');
			for(var i=0;i<math_op1.length;i++){
				if( math_op1[i] == value){
					var now=document.getElementById("screen").value;
					now = value+"(" + now + ")" ;
					document.getElementById("screen").value = now;
					return ;			
				}
			}		
			
			if(value=='sqr'){
				var now=document.getElementById("screen").value;
				now = "(" + now + ")^2" ;
				document.getElementById("screen").value = now;
				return ;
			}
			if(value=='pi'){
				value=3.1416;
			}
			
			document.getElementById("screen").value = document.getElementById("screen").value+value;
			// else document.getElementById("screen").value = value;
			ans_found=0;
		}	
		
		function find_trigo(value,ans){		
			var ret_val=parseFloat(ans);
			if(value=='sin'){
				ret_val=Math.sin(ret_val);
			}
			else if(value=='cos'){
				ret_val=Math.cos(ret_val);
			}
			else if(value=='tan'){
				ret_val=Math.tan(ret_val);
			}
			else if(value == 'log'){
				ret_val=Math.log(ret_val);
			}
			else if(value == 'ln'){
				ret_val=Math.log(ret_val);
			}
			
			return ret_val;
		}
		function isdigit(ch){
			if( (ch>='0' && ch<='9') || ch=='.') return 1;
			return 0;			
		}
		function isInt(n) {
			return n % 1 === 0;
		}
		
		function infix_to_postfix(expr){
			count=-1;
			var ret_val="";
			var stack=new Array();
			
			for(var i=0;i<expr.length;i++){
				if(expr[i]=='s'){
					stack.push(expr[i]); count++;
					i=i+2;
					continue;
				}
				if(expr[i]=='c' && expr[i+1]=='o'){
					stack.push('C'); count++;
					i=i+2;
					continue;
				}
				if(expr[i]=='t'){
					stack.push(expr[i]); count++;
					i=i+2;
					continue;
				}
				if(expr[i]=='l'){
					stack.push(expr[i]); count++;
					i=i+2;
					continue;
				}
				if(expr[i]=='r'){
					stack.push(expr[i]); count++;
					i=i+3;
					continue;					
				}
				if(expr[i]=='m'){
					stack.push(expr[i]); count++;
					i=i+2;
					continue;					
				}
				if(expr[i]=='f'){
					stack.push(expr[i]); count++;
					i=i+5;
					continue;
				}
				if(expr[i]=='c'){
					stack.push(expr[i]); count++;
					i=i+3;
					continue;
				}
				if(expr[i]=='('){
					stack.push(expr[i]); count++;
					continue;
				}
				if(expr[i]==')'){
					while(count>=0){
						var now=stack.pop(); count--;
						if(now=='(') break;
						ret_val= ret_val + now; 
					}
					continue;
				}
				if( isdigit(expr[i])==1 ){
					while(isdigit(expr[i])==1 ){
						ret_val= ret_val + expr[i]; 
						i++;
					}
					i--;
					ret_val = ret_val + ' ';
					continue;
				}
				else{	
					var op_now=expr[i];				
					while(count>=0){
						var op=stack[count];
						if(priority[op_now]<=priority[op]){
							ret_val = ret_val + stack.pop();							
							count--;
						}
						else break;
					}
					stack.push(expr[i]); count++;					
				}
			}			
			while(count>=0){
				ret_val=ret_val + stack.pop();
				count--;
			}			
			return ret_val;
		}
		
		function calculate(expr){
			expr=infix_to_postfix(expr);
			var ret_val=postfix_evaluation(expr);
			ans_found=1;
			return ret_val;
		}
		
		function postfix_evaluation(expr){
			var stack=new Array();
			for (var i=0;i<expr.length;i++)
			{
				if(expr[i]==' ') continue;
				if(isdigit(expr[i])==1 ){
					var now=0;
					var res="";
					while( isdigit(expr[i])==1 ){
						res= res+expr[i];						
						i++;
					}
					i--;
					now=parseFloat(res);
					stack.push(now);
					count++;
				}
				else if(expr[i]=='r'){
					var a=stack.pop(); count--;
					var res=0.0;
					res=Math.sqrt(parseFloat(a));
					stack.push(res); count++;										
				}
				else if(expr[i]=='c'){
					var a=stack.pop(); count--;
					var res=0.0;
					res=Math.ceil(parseFloat(a));
					stack.push(res); count++;										
				}
				else if(expr[i]=='s'){
					var a=stack.pop(); count--;
					var res=0.0;
					res=Math.sin(parseFloat(a));
					stack.push(res); count++;										
				}
				else if(expr[i]=='C'){
					var a=stack.pop(); count--;
					var res=0.0;
					res=Math.cos(parseFloat(a));
					stack.push(res); count++;										
				}
				else if(expr[i]=='t'){
					var a=stack.pop(); count--;
					var res=0.0;
					res=Math.tan(parseFloat(a));
					stack.push(res); count++;										
				}else if(expr[i]=='l'){
					var a=stack.pop(); count--;
					var res=0.0;
					res=Math.log(parseFloat(a));
					stack.push(res); count++;										
				}
				else if(expr[i]=='%'){
					var a=stack.pop(); count--;
					var res=0.0;
					res=parseFloat(a) / parseFloat(100.0);
					stack.push(res); count++;						
				}
				else if(expr[i]=='f'){
					var a=stack.pop(); count--;
					var res=0.0;
					res=Math.floor(parseFloat(a));
					stack.push(res); count++;						
				}				
				else{
					var a=stack.pop(); count--;
					var b=stack.pop(); count--;
					var res=0;
					if(expr[i]=='+')        res=parseFloat(a) + parseFloat(b);
					else if(expr[i]=='-')   res=parseFloat(b) - parseFloat(a);
					else if(expr[i]=='*')   res=parseFloat(a) * parseFloat(b);
					else if(expr[i]=='/') 	res= parseFloat(b) / parseFloat(a);
					else if(expr[i]=='^') 	res= Math.pow(parseFloat(b),parseFloat(a));		
					else if(expr[i]=='m')	res= parseInt(b) % parseInt(a);					
					
					if(!isInt(res)) res=parseFloat(res).toPrecision(9);	
					stack.push(res); count++;
				}
			}							
			return stack.pop();
		}		
		
		function init(){		
			
			var field = document.getElementById("screen");
			field.addEventListener("keydown", function (e) {
				if (e.keyCode === 13) {  // checks whether the pressed key is
											// "Enter"
					viewvalue('=');
				}
			});			
			document.getElementById("h2").innerHTML = "Calculator";
			var buttons=new Array('7','8','9','+','sin','4','5','6','-','cos','1','2','3','*','tan','0','.','CE','/','(','log','root','sqr','ln',')','^','%','mod','floor','ceil','pi','=');
			
			var s="<tr>";	
			
			var j=1;
			for(var i=0;i<buttons.length;i++,j++){
				var append="";
				if(buttons[i]=='='){
					append="colspan='2'";
				}
				s=s+"<td " + append + " id='demo' class='btn1' ><button type='button' class='btn' onclick=viewvalue('" + buttons[i] +
					"')>"+ buttons[i] + "</button></td>";
				if(j%5==0){
					s = s + "</tr>\n<tr>";
				}	
			}
			// alert(s);
			s = s + "</tr>";
			document.getElementById("table").innerHTML = s;
			
		}		
		
	</script>