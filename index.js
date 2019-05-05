function isArray(ary) {
    return Object.prototype.toString.call(ary).slice(8, -1) === "Array";
}

function delegetter(objs) {
    if (!new.target) return new delegetter(objs);
    this.objs = objs;
}

delegetter.prototype.getter = function(prop, def = "") {
    const isAry = isArray(prop);
    let value;
    if (isAry) {
        let idx = 0;
        value = this.objs;
        while (idx < prop.length) {
            if (value == null) return def;
            let x = prop[idx];
            value = value[x];
            idx++;
        }
    } else {
        value = Reflect.get(this.objs, prop);
    }

    return value === undefined || value == null || value !== value
        ? def
        : value;
};

delegetter.prototype.setter = function(paths, value) {
    let curValue;
    paths.forEach(prop => {
        curValue = this.getter(prop);
        if (curValue == null) {
            curValue = Number.isInteger(prop) ? [] : {};
            this.objs.prop = curValue;
        }
    });

    return paths.reduce((prev, acc) => {
        prev = prev[acc];
        return prev;
    }, this.objs);
};
