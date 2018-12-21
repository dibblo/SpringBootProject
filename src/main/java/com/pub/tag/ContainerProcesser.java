package com.pub.tag;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Document;
import org.thymeleaf.dom.Element;
import org.thymeleaf.dom.Node;
import org.thymeleaf.dom.Text;
import org.thymeleaf.processor.element.AbstractFragmentHandlingElementProcessor;

import java.util.ArrayList;
import java.util.List;

public class ContainerProcesser extends AbstractFragmentHandlingElementProcessor {
    private Logger logger = LoggerFactory.getLogger(ContainerProcesser.class);

    protected ContainerProcesser(String elementName) {
        super(elementName);
    }

    @Override
    protected boolean getRemoveHostNode(Arguments arguments, Element element) {
        return false;
    }

    @Override
    protected List<Node> computeFragment(Arguments arguments, Element element) {
        logger.debug("进入Container标签");
        final Element header = new Element("div", "header");
        final Element footer = new Element("div", "footer");
        final Text text = new Text("123123");
        final Document doc = new Document("index2");
        List<Node> nodes = new ArrayList<>();
        header.addChild(text);
        nodes.add(doc);
        nodes.addAll(element.getChildren());
        nodes.add(footer);
        return nodes;
    }

    @Override
    public int getPrecedence() {
        return 0;
    }
}
