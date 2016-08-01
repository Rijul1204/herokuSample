package hello;

import org.springframework.web.bind.annotation.RestController;

import hello.service.JavaCVService;
import hello.service.PdfBoxService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

@Controller
public class HelloController {
	
	@Autowired
	JavaCVService javaCVService;
	
	@Autowired
	PdfBoxService pdfService;

    @RequestMapping("/")
    @ResponseBody
    public String index() {
        return "Greetings from Spring Boot!";
    }
    
    @RequestMapping("/java-cv")
    @ResponseBody
    public String runJavaCV() {
    	javaCVService.smooth("C:\\Users\\DOLPHIN-PC\\Desktop\\pics\\building.jpg");
        return "Running Java CV";
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
    
    @RequestMapping("/readPdf")
    @ResponseBody
    public String readPdf(Model model) {
    	return pdfService.readPdf();
    }
    
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        // Thread.sleep(3000); // simulated delay
        return new Greeting( message.getName());
    }
    
    @MessageMapping("/board")
    @SendTo("/topic/board")
    public List<Point> getPoint(List<Point> point) throws Exception {
        // Thread.sleep(3000); // simulated delay
        return point;
    }

}
