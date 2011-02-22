package se.vgregion.verticalprio.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.apache.commons.collections.BeanMap;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class AbstractHirarkiskKod<T extends AbstractHirarkiskKod<?>> extends AbstractKod implements
        Cloneable {

    @OneToMany
    @JoinColumn(name = "parent_id")
    private List<T> children; // = new ArrayList<T>();

    @Transient
    private boolean selected;

    @javax.persistence.Column(name = "parent_id")
    private Long parentId;

    public List<T> getChildren() {
        return children;
    }

    public void setChildren(List<T> children) {
        this.children = children;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    public boolean isSelected() {
        return selected;
    }

    /**
     * @inheritDoc
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Override
    public T clone() {
        BeanMap thisMap = new BeanMap(this);
        T result;
        try {
            result = (T) getClass().newInstance();
        } catch (InstantiationException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }

        new BeanMap(result).putAllWriteable(thisMap);
        result.setId(getId());
        List newChildren = new ArrayList();
        result.setChildren(newChildren);

        if (getChildren() != null) {
            for (AbstractHirarkiskKod kod : getChildren()) {
                newChildren.add(kod.clone());
            }
        }

        return result;
    }

    public void setSelectedDeeply(boolean b) {
        selected = b;
        if (children != null) {
            for (T child : children) {
                child.setSelectedDeeply(b);
            }
        }
    }

    public boolean isSelectedDeeply() {
        if (!selected) {
            return false;
        }

        if (children != null) {
            for (T child : children) {
                if (!child.isSelectedDeeply()) {
                    return false;
                }
            }
        }
        return true;
    }

}