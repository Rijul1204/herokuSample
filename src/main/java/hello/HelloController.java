package hello;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

@Controller
public class HelloController {
	
    @RequestMapping("/")
    @ResponseBody
    public String index() {
        return "Greetings from Spring Boot!";
    }    
    
    @RequestMapping("/websock")
    public String websock() {
        return "index";
    }
    
    @RequestMapping("/shared-board")
    public String sharedBoard() {
        return "board";
    }
    
    @RequestMapping("/calculator")
    public String getCalculator(Model model) {
        return "calculator";
    }    
        
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        // Thread.sleep(3000); // simulated delay
        return new Greeting( message.getName());
    }
    
    @MessageMapping("/board")
    @SendTo("/topic/board")
    public Point getPoint(Point point) throws Exception {
        // Thread.sleep(3000); // simulated delay
        return point;
    }

}
