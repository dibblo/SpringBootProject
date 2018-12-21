package com.pub.tag;

import org.springframework.stereotype.Component;
import org.thymeleaf.dialect.AbstractDialect;
import org.thymeleaf.processor.IProcessor;

import java.util.HashSet;
import java.util.Set;

/**
 * 自定义标签fn,带有msg 和 container的值
 */
@Component
public class FnTag extends AbstractDialect {
    private static final String PREFIX = "fn";
    private static final String ELEMENT_MSG = "msg";
    private static final String ELEMENT_CONTAINER = "container";

    @Override
    public String getPrefix() {
        return PREFIX;
    }

    @Override
    public Set<IProcessor> getProcessors() {
        final Set<IProcessor> processors = new HashSet<>();
        processors.add(new MsgProcesser(ELEMENT_MSG));
        processors.add(new ContainerProcesser(ELEMENT_CONTAINER));
        return processors;
    }

    /*implements TemplateDirectiveModel {

    @Override
    public void execute(Environment environment, Map map, TemplateModel[] templateModels, TemplateDirectiveBody templateDirectiveBody) throws TemplateException, IOException {
        if (map.containsKey("value")) {
            Writer wr = environment.getOut();
            wr.write(LanguageManager.msg.get(map.get("value")));
            templateDirectiveBody.render(environment.getOut());
        } else {
            throw new TemplateException(environment);
        }
    }*/
}
