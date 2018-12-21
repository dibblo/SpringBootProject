package com.dlw.controller;

import com.pub.LanguageManager;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class IndexController {

    private org.slf4j.Logger logger = LoggerFactory.getLogger(IndexController.class);

    @GetMapping(value = "/", produces = "text/plain;charset=UTF-8")
    public String getIndexPage(ModelMap modelMap) {
        logger.debug("进入index页面");
        return "/saas";
    }

    @RequestMapping(value = "login")
    public ModelAndView functionName(HttpServletRequest request, ModelMap modelMap) {
        return new ModelAndView("login/login", modelMap);
    }
}
