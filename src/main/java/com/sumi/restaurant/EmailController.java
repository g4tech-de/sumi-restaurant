package com.sumi.restaurant;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;

@RestController
@RequestMapping("/send")
public class EmailController {

    @Autowired
    private JavaMailSender javaMailSender;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(path = "/mail",method = RequestMethod.POST)
    public String sendEmail(@RequestBody String request) {
        JSONObject object = new JSONObject(request);

        String emailTo = "duydark94@gmail.com";
        String star = object.getString("rate_star");
        if (star.trim().isEmpty()) {
            star = "0";
        }
        String name = object.getString("rate_name");
        if (name.trim().isEmpty()) {
            name = "anonymous";
        }
        String title = object.getString("rate_title");
        if (title.trim().isEmpty()) {
            title = "Feedback";
        }
        String message = object.getString("rate_message");

        StringBuilder builder = new StringBuilder();
        builder.append("Name: " + name + "\n");
        builder.append("Rating: " +star + "\n");
        builder.append("Feedback:\n" + message + "\n\n");

        String finalTitle = title;
        String finalMessage = builder.toString();
        javaMailSender.send(mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(
                    mimeMessage, true, "UTF-8");
            messageHelper.setTo(emailTo);
            messageHelper.setSubject(finalTitle);
            messageHelper.setText(finalMessage,false);
        });
        return "Feedback wurde gesendet";
    }
}
