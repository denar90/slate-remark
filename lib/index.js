'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function mdastToSlate(node) {
    return createSlateRoot(node);
}
function createSlateRoot(root) {
    return convertNodes(root.children, {});
}
function convertNodes(nodes, decoration) {
    return nodes.reduce(function (acc, node) {
        acc.push.apply(acc, createSlateNode(node, decoration));
        return acc;
    }, []);
}
function createSlateNode(node, decoration) {
    var _a;
    switch (node.type) {
        case "paragraph":
            return [createParagraph(node, decoration)];
        case "heading":
            return [createHeading(node, decoration)];
        case "thematicBreak":
            return [createThematicBreak(node)];
        case "blockquote":
            return [createBlockquote(node, decoration)];
        case "list":
            return [createList(node, decoration)];
        case "listItem":
            return [createListItem(node, decoration)];
        case "table":
            return [createTable(node, decoration)];
        case "tableRow":
            return [createTableRow(node, decoration)];
        case "tableCell":
            return [createTableCell(node, decoration)];
        case "html":
            return [createHtml(node)];
        case "code":
            return [createCode(node)];
        case "yaml":
            return [createYaml(node)];
        case "toml":
            return [createToml(node)];
        case "definition":
            return [createDefinition(node)];
        case "footnoteDefinition":
            return [createFootnoteDefinition(node, decoration)];
        case "text":
            return [createText(node.value, decoration)];
        case "emphasis":
        case "strong":
        case "delete": {
            var type_1 = node.type, children = node.children;
            return children.reduce(function (acc, n) {
                var _a;
                acc.push.apply(acc, createSlateNode(n, __assign(__assign({}, decoration), (_a = {}, _a[type_1] = true, _a))));
                return acc;
            }, []);
        }
        case "inlineCode": {
            var type = node.type, value = node.value;
            return [createText(value, __assign(__assign({}, decoration), (_a = {}, _a[type] = true, _a)))];
        }
        case "break":
            return [createBreak(node)];
        case "link":
            return [createLink(node, decoration)];
        case "image":
            return [createImage(node)];
        case "linkReference":
            return [createLinkReference(node, decoration)];
        case "imageReference":
            return [createImageReference(node)];
        case "footnote":
            return [createFootnote(node, decoration)];
        case "footnoteReference":
            return [createFootnoteReference(node)];
        case "math":
            return [createMath(node)];
        case "inlineMath":
            return [createInlineMath(node)];
    }
    return [];
}
function createParagraph(node, decoration) {
    var type = node.type, children = node.children;
    return {
        type: type,
        children: convertNodes(children, decoration),
    };
}
function createHeading(node, decoration) {
    var type = node.type, children = node.children, depth = node.depth;
    return {
        type: type,
        depth: depth,
        children: convertNodes(children, decoration),
    };
}
function createThematicBreak(node) {
    return {
        type: node.type,
        children: [{ text: "" }],
    };
}
function createBlockquote(node, decoration) {
    return {
        type: node.type,
        children: convertNodes(node.children, decoration),
    };
}
function createList(node, decoration) {
    var type = node.type, children = node.children, ordered = node.ordered, start = node.start, spread = node.spread;
    return {
        type: type,
        children: convertNodes(children, decoration),
        ordered: ordered,
        start: start,
        spread: spread,
    };
}
function createListItem(node, decoration) {
    var type = node.type, children = node.children, checked = node.checked, spread = node.spread;
    return {
        type: type,
        children: convertNodes(children, decoration),
        checked: checked,
        spread: spread,
    };
}
function createTable(node, decoration) {
    var type = node.type, children = node.children, align = node.align;
    return {
        type: type,
        children: convertNodes(children, decoration),
        align: align,
    };
}
function createTableRow(node, decoration) {
    var type = node.type, children = node.children;
    return {
        type: type,
        children: convertNodes(children, decoration),
    };
}
function createTableCell(node, decoration) {
    var type = node.type, children = node.children;
    return {
        type: type,
        children: convertNodes(children, decoration),
    };
}
function createHtml(node) {
    var type = node.type, value = node.value;
    return {
        type: type,
        children: [{ text: value }],
    };
}
function createCode(node) {
    var type = node.type, value = node.value, lang = node.lang, meta = node.meta;
    return {
        type: type,
        lang: lang,
        meta: meta,
        children: [{ text: value }],
    };
}
function createYaml(node) {
    var type = node.type, value = node.value;
    return {
        type: type,
        children: [{ text: value }],
    };
}
function createToml(node) {
    var type = node.type, value = node.value;
    return {
        type: type,
        children: [{ text: value }],
    };
}
function createMath(node) {
    var type = node.type, value = node.value;
    return {
        type: type,
        children: [{ text: value }],
    };
}
function createInlineMath(node) {
    var type = node.type, value = node.value;
    return {
        type: type,
        children: [{ text: value }],
    };
}
function createDefinition(node) {
    var type = node.type, identifier = node.identifier, label = node.label, url = node.url, title = node.title;
    return {
        type: type,
        identifier: identifier,
        label: label,
        url: url,
        title: title,
        children: [{ text: "" }],
    };
}
function createFootnoteDefinition(node, decoration) {
    var type = node.type, children = node.children, identifier = node.identifier, label = node.label;
    return {
        type: type,
        children: convertNodes(children, decoration),
        identifier: identifier,
        label: label,
    };
}
function createText(text, decoration) {
    return __assign(__assign({}, decoration), { text: text });
}
function createBreak(node) {
    return {
        type: node.type,
        children: [{ text: "" }],
    };
}
function createLink(node, decoration) {
    var type = node.type, children = node.children, url = node.url, title = node.title;
    return {
        type: type,
        children: convertNodes(children, decoration),
        url: url,
        title: title,
    };
}
function createImage(node) {
    var type = node.type, url = node.url, title = node.title, alt = node.alt;
    return {
        type: type,
        url: url,
        title: title,
        alt: alt,
        children: [{ text: "" }],
    };
}
function createLinkReference(node, decoration) {
    var type = node.type, children = node.children, referenceType = node.referenceType, identifier = node.identifier, label = node.label;
    return {
        type: type,
        children: convertNodes(children, decoration),
        referenceType: referenceType,
        identifier: identifier,
        label: label,
    };
}
function createImageReference(node) {
    var type = node.type, alt = node.alt, referenceType = node.referenceType, identifier = node.identifier, label = node.label;
    return {
        type: type,
        alt: alt,
        referenceType: referenceType,
        identifier: identifier,
        label: label,
        children: [{ text: "" }],
    };
}
function createFootnote(node, decoration) {
    var type = node.type, children = node.children;
    return {
        type: type,
        children: convertNodes(children, decoration),
    };
}
function createFootnoteReference(node) {
    var type = node.type, identifier = node.identifier, label = node.label;
    return {
        type: type,
        identifier: identifier,
        label: label,
        children: [{ text: "" }],
    };
}

function plugin() {
    // @ts-ignore
    this.Compiler = function (node) {
        return mdastToSlate(node);
    };
}

function slateToMdast(node) {
    return createMdastRoot(node);
}
function createMdastRoot(node) {
    var root = {
        type: "root",
        children: convertNodes$1(node.children),
    };
    return root;
}
function convertNodes$1(nodes) {
    var mdastNodes = [];
    var textQueue = [];
    var _loop_1 = function (i) {
        var n = nodes[i];
        if (n && isText(n)) {
            textQueue.push(n);
        }
        else {
            var mdastTexts = [];
            var starts_1 = [];
            var textTemp = "";
            var _loop_2 = function (j) {
                var cur = textQueue[j];
                textTemp += cur.text;
                var prev = textQueue[j - 1];
                var next = textQueue[j + 1];
                var ends = [];
                if (cur.inlineCode) {
                    if (!prev || !prev.inlineCode) {
                        starts_1.push("inlineCode");
                    }
                    if (!next || !next.inlineCode) {
                        ends.push("inlineCode");
                    }
                }
                if (cur.emphasis) {
                    if (!prev || !prev.emphasis) {
                        starts_1.push("emphasis");
                    }
                    if (!next || !next.emphasis) {
                        ends.push("emphasis");
                    }
                }
                if (cur.strong) {
                    if (!prev || !prev.strong) {
                        starts_1.push("strong");
                    }
                    if (!next || !next.strong) {
                        ends.push("strong");
                    }
                }
                if (cur.delete) {
                    if (!prev || !prev.delete) {
                        starts_1.push("delete");
                    }
                    if (!next || !next.delete) {
                        ends.push("delete");
                    }
                }
                if (starts_1.length > 0) {
                    var res_1 = {
                        type: "text",
                        value: textTemp,
                    };
                    textTemp = "";
                    var startsReversed = starts_1.slice().reverse();
                    startsReversed.forEach(function (k) {
                        if (k === "inlineCode") {
                            res_1 = {
                                type: k,
                                value: res_1.value,
                            };
                        }
                        else {
                            res_1 = {
                                type: k,
                                children: [res_1],
                            };
                        }
                    });
                    mdastTexts.push(res_1);
                }
                if (starts_1.length > 0 && ends.length > 0) {
                    var endsToRemove = starts_1.reduce(function (acc, k, kIndex) {
                        if (ends.includes(k)) {
                            acc.push({ key: k, index: kIndex });
                        }
                        return acc;
                    }, []);
                    endsToRemove.reverse().forEach(function (e) {
                        starts_1.splice(e.index, 1);
                    });
                }
                else {
                    mdastTexts.push({ type: "text", value: textTemp });
                    textTemp = "";
                }
            };
            for (var j = 0; j < textQueue.length; j++) {
                _loop_2(j);
            }
            if (textTemp) {
                mdastTexts.push({ type: "text", value: textTemp });
                textTemp = "";
            }
            mdastNodes.push.apply(mdastNodes, mergeTexts(mdastTexts));
            textQueue = [];
            if (!n)
                return "continue";
            var node = createMdastNode(n);
            if (node) {
                mdastNodes.push(node);
            }
        }
    };
    for (var i = 0; i <= nodes.length; i++) {
        _loop_1(i);
    }
    return mdastNodes;
}
function createMdastNode(node) {
    switch (node.type) {
        case "paragraph":
            return createParagraph$1(node);
        case "heading":
            return createHeading$1(node);
        case "thematicBreak":
            return createThematicBreak$1(node);
        case "blockquote":
            return createBlockquote$1(node);
        case "list":
            return createList$1(node);
        case "listItem":
            return createListItem$1(node);
        case "table":
            return createTable$1(node);
        case "tableRow":
            return createTableRow$1(node);
        case "tableCell":
            return createTableCell$1(node);
        case "html":
            return createHtml$1(node);
        case "code":
            return createCode$1(node);
        case "yaml":
            return createYaml$1(node);
        case "toml":
            return createToml$1(node);
        case "definition":
            return createDefinition$1(node);
        case "footnoteDefinition":
            return createFootnoteDefinition$1(node);
        case "break":
            return createBreak$1(node);
        case "link":
            return createLink$1(node);
        case "image":
            return createImage$1(node);
        case "linkReference":
            return createLinkReference$1(node);
        case "imageReference":
            return createImageReference$1(node);
        case "footnote":
            return createFootnote$1(node);
        case "footnoteReference":
            return creatFootnoteReference(node);
        case "math":
            return createMath$1(node);
        case "inlineMath":
            return createInlineMath$1(node);
    }
    return null;
}
function isText(node) {
    return "text" in node;
}
function mergeTexts(nodes) {
    var res = [];
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var cur = nodes_1[_i];
        var last = res[res.length - 1];
        if (last && last.type === cur.type) {
            if (last.type === "text") {
                last.value += cur.value;
            }
            else if (last.type === "inlineCode") {
                last.value += cur.value;
            }
            else {
                last.children = mergeTexts(last.children.concat(cur.children));
            }
        }
        else {
            if (cur.type === "text" && cur.value === "")
                continue;
            res.push(cur);
        }
    }
    return res;
}
function createParagraph$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        children: convertNodes$1(children),
    };
}
function createHeading$1(node) {
    var type = node.type, depth = node.depth, children = node.children;
    return {
        type: type,
        depth: depth,
        children: convertNodes$1(children),
    };
}
function createThematicBreak$1(node) {
    var type = node.type;
    return {
        type: type,
    };
}
function createBlockquote$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        children: convertNodes$1(children),
    };
}
function createList$1(node) {
    var type = node.type, ordered = node.ordered, start = node.start, spread = node.spread, children = node.children;
    return {
        type: type,
        ordered: ordered,
        start: start,
        spread: spread,
        children: convertNodes$1(children),
    };
}
function createListItem$1(node) {
    var type = node.type, checked = node.checked, spread = node.spread, children = node.children;
    return {
        type: type,
        checked: checked,
        spread: spread,
        children: convertNodes$1(children),
    };
}
function createTable$1(node) {
    var type = node.type, align = node.align, children = node.children;
    return {
        type: type,
        align: align,
        children: convertNodes$1(children),
    };
}
function createTableRow$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        children: convertNodes$1(children),
    };
}
function createTableCell$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        children: convertNodes$1(children),
    };
}
function createHtml$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        value: children[0].text,
    };
}
function createCode$1(node) {
    var type = node.type, lang = node.lang, meta = node.meta, children = node.children;
    return {
        type: type,
        lang: lang,
        meta: meta,
        value: children[0].text,
    };
}
function createYaml$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        value: children[0].text,
    };
}
function createToml$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        value: children[0].text,
    };
}
function createDefinition$1(node) {
    var type = node.type, identifier = node.identifier, label = node.label, url = node.url, title = node.title;
    return {
        type: type,
        identifier: identifier,
        label: label,
        url: url,
        title: title,
    };
}
function createFootnoteDefinition$1(node) {
    var type = node.type, identifier = node.identifier, label = node.label, children = node.children;
    return {
        type: type,
        identifier: identifier,
        label: label,
        children: convertNodes$1(children),
    };
}
function createBreak$1(node) {
    var type = node.type;
    return {
        type: type,
    };
}
function createLink$1(node) {
    var type = node.type, url = node.url, title = node.title, children = node.children;
    return {
        type: type,
        url: url,
        title: title,
        children: convertNodes$1(children),
    };
}
function createImage$1(node) {
    var type = node.type, url = node.url, title = node.title, alt = node.alt;
    return {
        type: type,
        url: url,
        title: title,
        alt: alt,
    };
}
function createLinkReference$1(node) {
    var type = node.type, identifier = node.identifier, label = node.label, referenceType = node.referenceType, children = node.children;
    return {
        type: type,
        identifier: identifier,
        label: label,
        referenceType: referenceType,
        children: convertNodes$1(children),
    };
}
function createImageReference$1(node) {
    var type = node.type, identifier = node.identifier, label = node.label, alt = node.alt, referenceType = node.referenceType;
    return {
        type: type,
        identifier: identifier,
        label: label,
        alt: alt,
        referenceType: referenceType,
    };
}
function createFootnote$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        children: convertNodes$1(children),
    };
}
function creatFootnoteReference(node) {
    var type = node.type, identifier = node.identifier, label = node.label;
    return {
        type: type,
        identifier: identifier,
        label: label,
    };
}
function createMath$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        value: children[0].text,
    };
}
function createInlineMath$1(node) {
    var type = node.type, children = node.children;
    return {
        type: type,
        value: children[0].text,
    };
}

var plugin$1 = function (settings) {
    // @ts-ignore
    return function (node) {
        return slateToMdast(node);
    };
};

function slate047ToSlate(nodes) {
    return convertNodes$2(nodes);
}
function convertNodes$2(nodes) {
    return nodes.reduce(function (acc, n) {
        var node = convert(n);
        if (node) {
            acc.push(node);
        }
        return acc;
    }, []);
}
function convert(node) {
    switch (node.object) {
        case "block": {
            var type = node.type, nodes = node.nodes, data = node.data;
            return __assign({ type: type, children: convertNodes$2(nodes) }, data);
        }
        case "inline": {
            var type = node.type, nodes = node.nodes, data = node.data;
            return __assign({ type: type, children: convertNodes$2(nodes) }, data);
        }
        case "text": {
            var _a = node.text, text = _a === void 0 ? "" : _a, marks = node.marks;
            return __assign({ text: text }, marks === null || marks === void 0 ? void 0 : marks.reduce(function (acc, m) {
                acc[m.type] = true;
                return acc;
            }, {}));
        }
    }
    return null;
}

var plugin$2 = function (settings) {
    // @ts-ignore
    return function (node) {
        return slateToMdast({
            type: "root",
            children: slate047ToSlate(node.children),
        });
    };
};

function slateToSlate047(nodes) {
    return {
        object: "value",
        document: {
            object: "document",
            nodes: convertNodes$3(nodes),
        },
    };
}
function convertNodes$3(nodes) {
    return nodes.reduce(function (acc, n) {
        var node = convert$1(n);
        if (node) {
            acc.push(node);
        }
        return acc;
    }, []);
}
function convert$1(node) {
    if ("text" in node) {
        var text = node.text, rest_1 = __rest(node, ["text"]);
        var marks = Object.keys(rest_1).reduce(function (acc, type) {
            if (!rest_1[type])
                return acc;
            acc.push({
                object: "mark",
                type: type,
            });
            return acc;
        }, []);
        var res = {
            object: "text",
            text: text,
            marks: marks,
        };
        return res;
    }
    switch (node.type) {
        case "paragraph":
        case "heading":
        case "blockquote":
        case "list":
        case "listItem":
        case "table":
        case "tableRow":
        case "tableCell":
        case "html":
        case "code":
        case "yaml":
        case "toml":
        case "thematicBreak":
        case "definition":
        case "break":
        case "math": {
            var type = node.type, children = node.children, rest = __rest(node, ["type", "children"]);
            var res = {
                object: "block",
                type: type,
                nodes: convertNodes$3(children),
                data: __assign({}, rest),
            };
            return res;
        }
        case "footnoteDefinition":
        case "link":
        case "linkReference":
        case "image":
        case "imageReference":
        case "footnoteReference":
        case "footnote":
        case "inlineMath": {
            var type = node.type, children = node.children, rest = __rest(node, ["type", "children"]);
            var res = {
                object: "inline",
                type: type,
                nodes: convertNodes$3(children),
                data: __assign({}, rest),
            };
            return res;
        }
    }
    return null;
}

function plugin$3() {
    // @ts-ignore
    this.Compiler = function (node) {
        return slateToSlate047(mdastToSlate(node));
    };
}

exports.remarkToSlate = plugin;
exports.remarkToSlateLegacy = plugin$3;
exports.slateLegacyToSlateTransformer = slate047ToSlate;
exports.slateToRemark = plugin$1;
exports.slateToRemarkLegacy = plugin$2;
