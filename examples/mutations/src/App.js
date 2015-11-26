import React from 'react';
import { Cursor, ImmutableOptimizations } from 'react-cursor';
import '!style!css!less!./App.less';


var getShortUID = function () {
    return ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
};

var getNewItem = function () {
    return {
        key: getShortUID()
    }
};


var Item = React.createClass({

    mixins: [ImmutableOptimizations(['model'])],

    propTypes: {
        model: React.PropTypes.instanceOf(Cursor).isRequired
    },

    addNew: function(event) {
        event.preventDefault();
        var key = this.refs.keyInput.getDOMNode().value.trim(),
            value = this.refs.valueInput.getDOMNode().value.trim();

        if (!key || !value) {
            return;
        }

        var newPair = {};
        newPair[key] = value;
        this.props.model.merge(newPair);
    },

    render: function () {
        var model = this.props.model,
            fields = Object.keys(model.value())
                .filter(function(key) {
                    return key !== 'key';
                })
                .map(function (key, index) {
                    return (
                        <div className="item-property" key={index}>
                            <span className="property-key">{key}</span>
                            <span className="property-value">{model.value()[key]}</span>
                        </div>
                    );
                }, this);

        return (
            <div className="item">
                <h3>Item <span className="pre">{model.value().key}</span></h3>
                <div className="item-properties">{fields}</div>
                <form onSubmit={this.addNew}>
                    <input name="key" placeholder="Key" ref="keyInput" />
                    <input name="value" placeholder="Value" ref="valueInput" />
                    <button type="submit">+ / &radic;</button>
                </form>
            </div>
        );
    }
});


var List = React.createClass({

    mixins: [ImmutableOptimizations(['list'])],

    propTypes: {
        list: React.PropTypes.instanceOf(Cursor).isRequired
    },

    moveUp: function(index) {
        if (index > 0) {
            var currentAtPosition = this.props.list.value()[index-1];
            this.props.list.splice([
                [index-1, 1],
                [index, 0, currentAtPosition]
            ]);
        }
    },

    moveDown: function(index) {
        if (index < this.props.list.value().length - 1) {
            var currentAtPosition = this.props.list.value()[index+1];
            this.props.list.splice([
                [index+1, 1],
                [index, 0, currentAtPosition]
            ]);
        }
    },

    insertBefore: function(index) {
        var newItem = getNewItem();

        if (index > 0) {
            this.props.list.splice([
                [index, 0, newItem]
            ]);
        } else {
            // This is actually an equivalent to the splice call above. It's here for demonstration purposes
            this.props.list.unshift([newItem]);
        }
    },

    insertAfter: function(index) {
        var newItem = getNewItem();

        if (index < this.props.list.value().length - 1) {
            this.props.list.splice([
                [index+1, 0, newItem]
            ]);
        } else {
            this.props.list.push([newItem]);
        }
    },

    remove: function(index) {
        this.props.list.splice([
            [index, 1]
        ]);
    },

    appendNew: function () {
        this.props.list.push([getNewItem()]);
    },

    prependNew: function () {
        this.props.list.unshift([getNewItem()]);
    },

    removeAll: function () {
        this.props.list.set([]);
    },

    render: function () {
        var model,
            list = this.props.list,
            children = list.value().map(function (item, index) {
                model = list.refine(index);
                return (
                    <div className="item-container" key={item.key}>
                        <Item model={model} />
                        <div className="item-controls">
                            <button onClick={this.moveUp.bind(null, index)}>&uarr;</button>
                            <button onClick={this.moveDown.bind(null, index)}>&darr;</button>
                            <button onClick={this.insertBefore.bind(null, index)}>+&uarr;</button>
                            <button onClick={this.insertAfter.bind(null, index)}>+&darr;</button>
                            <button onClick={this.remove.bind(null, index)}>x</button>
                        </div>
                    </div>
                );
            }, this);
        return (
            <div>
                <h2>Item list</h2>
                <div className="item-list" >{children}</div>
                <div className="item-list-controls">
                    <button onClick={this.appendNew}>Append new item</button>
                    <button onClick={this.prependNew}>Prepend new item</button>
                    <button onClick={this.removeAll}>Remove all</button>
                </div>
            </div>
        );
    }
});

var Application = React.createClass({
    getInitialState: function () {
        return {
            list: [
                {
                    key: getShortUID(),
                    name: 'Luke Skywalker'
                },
                {
                    key: getShortUID(),
                    name: 'Yoda'
                },
                {
                    key: getShortUID(),
                    name: 'Darth Vader'
                }
            ]
        }
    },

    render: function () {
        var cursor = Cursor.build(this);
        return (
            <div className="app">
                <List list={cursor.refine('list')} />
            </div>
        );
    }
});

export default Application;
