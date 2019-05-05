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
    let curValue,
        idx = 0;
    const props = [];
    paths.reduce((init, acc) => {
        props.push(acc);
        curValue = this.getter(props);
        if (!curValue) {
            console.log(paths[idx + 1]);
            curValue =
                Number.isInteger(props[props.length - 1]) ||
                Number.isInteger(paths[idx + 1])
                    ? []
                    : {};
        }

        if (acc === paths[paths.length - 1]) {
            curValue = value;
        }

        init[acc] = curValue;
        idx++;
        return init[acc];
    }, this.objs);

    return this.objs;
};


module.exports = delegetter;