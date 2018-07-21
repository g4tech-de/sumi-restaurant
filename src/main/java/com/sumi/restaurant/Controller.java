package com.sumi.restaurant;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@org.springframework.stereotype.Controller
public class Controller {

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String landing() {
        return "redirect:/home";
    }

    @RequestMapping(path = "/home", method = RequestMethod.GET)
    public String home() {
        return "index";
    }
}
