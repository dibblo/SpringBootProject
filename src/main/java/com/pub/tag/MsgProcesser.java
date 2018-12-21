package com.pub.tag;

import com.pub.LanguageManager;
import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;
import org.thymeleaf.dom.Node;
import org.thymeleaf.dom.Text;
import org.thymeleaf.processor.element.AbstractMarkupSubstitutionElementProcessor;

import java.util.ArrayList;
import java.util.List;

/**
 * 自定义标签 fn:msg的解析规则
 */
public class MsgProcesser extends AbstractMarkupSubstitutionElementProcessor {
    protected MsgProcesser(String elementName) {
        super(elementName);
    }

    @Override
    protected List<Node> getMarkupSubstitutes(Arguments arguments, Element element) {
        if (element.hasAttribute("value")) {
            final Text text = new Text(LanguageManager.msg.get(element.getAttributeValue("value")));
            final List<Node> nodes = new ArrayList<Node>();
            nodes.add(text);
            return nodes;
        } else {
            return null;
        }
    }

    @Override
    public int getPrecedence() {
        return 0;
    }
}
