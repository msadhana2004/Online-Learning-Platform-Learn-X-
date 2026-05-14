package com.learnx.controller;

import com.learnx.model.Certificate;
import com.learnx.model.User;
import com.learnx.model.Course;

import com.learnx.repository.CertificateRepository;
import com.learnx.repository.UserRepository;
import com.learnx.repository.CourseRepository;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.*;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/certificate")
@CrossOrigin(origins="http://localhost:5173")
public class CertificateController {

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generateCertificate(@RequestBody Map<String,Long> request){

        Long userId=request.get("userId");
        Long courseId=request.get("courseId");

        User user=userRepository.findById(userId).orElse(null);
        Course course=courseRepository.findById(courseId).orElse(null);

        if(user==null || course==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        String certCode="CERT-"+System.currentTimeMillis();

        Certificate cert=new Certificate();
        cert.setUserId(userId);
        cert.setCourseId(courseId);
        cert.setCertificateCode(certCode);

        certificateRepository.save(cert);

        String html=
        "<div style='text-align:center;padding:50px;border:5px solid black'>" +
        "<h1>Certificate of Completion</h1>" +
        "<h2>"+user.getName()+"</h2>" +
        "<p>has successfully completed</p>" +
        "<h3>"+course.getTitle()+"</h3>" +
        "<p>Date: "+LocalDate.now()+"</p>" +
        "<p>Certificate ID: "+certCode+"</p>" +
        "</div>";

        try{

            ByteArrayOutputStream os=new ByteArrayOutputStream();

            PdfRendererBuilder builder=new PdfRendererBuilder();
            builder.withHtmlContent(html,null);
            builder.toStream(os);
            builder.run();

            byte[] pdf=os.toByteArray();

            HttpHeaders headers=new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(
                    ContentDisposition.builder("attachment")
                            .filename("certificate.pdf")
                            .build()
            );

            return new ResponseEntity<>(pdf,headers,HttpStatus.OK);

        }catch(Exception e){

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

        }
    }
}