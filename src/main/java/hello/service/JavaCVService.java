package hello.service;

import static org.bytedeco.javacpp.opencv_core.*;
import static org.bytedeco.javacpp.opencv_imgproc.*;

import org.springframework.stereotype.Service;

import static org.bytedeco.javacpp.opencv_imgcodecs.*;

@Service
public class JavaCVService {

	public static void smooth(String filename) { 
        IplImage image = cvLoadImage(filename);
        if (image != null) {
            cvSmooth(image, image);
            cvSaveImage(filename, image);
            cvReleaseImage(image);
        }
    }

	
}
