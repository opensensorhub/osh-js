var XLink_1_0_Module_Factory = function () {
  var XLink_1_0 = {
    n: 'XLink_1_0',
    dens: 'http:\/\/www.w3.org\/1999\/xlink',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    tis: [{
        ln: 'Simple',
        tn: 'simple',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'type',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'Token',
            t: 'a'
          }]
      }, {
        ln: 'ResourceType',
        tn: 'resourceType',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'label',
            ti: 'NCName',
            t: 'a'
          }]
      }, {
        ln: 'Extended',
        tn: 'extended',
        ps: [{
            n: 'extendedModel',
            mno: 0,
            col: true,
            etis: [{
                en: 'title',
                ti: '.TitleEltType'
              }, {
                en: 'resource',
                ti: '.ResourceType'
              }, {
                en: 'locator',
                ti: '.LocatorType'
              }, {
                en: 'arc',
                ti: '.ArcType'
              }],
            t: 'es'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }]
      }, {
        ln: 'LocatorType',
        tn: 'locatorType',
        ps: [{
            n: 'locatorTitle',
            mno: 0,
            col: true,
            en: 'title',
            ti: '.TitleEltType'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'href',
            rq: true,
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'label',
            ti: 'NCName',
            t: 'a'
          }]
      }, {
        ln: 'TitleEltType',
        tn: 'titleEltType',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'ArcType',
        tn: 'arcType',
        ps: [{
            n: 'locatorTitle',
            mno: 0,
            col: true,
            en: 'title',
            ti: '.TitleEltType'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'from',
            ti: 'NCName',
            t: 'a'
          }, {
            n: 'to',
            ti: 'NCName',
            t: 'a'
          }]
      }, {
        t: 'enum',
        ln: 'ActuateType',
        bti: 'Token',
        vs: ['onLoad', 'onRequest', 'other', 'none']
      }, {
        t: 'enum',
        ln: 'ShowType',
        bti: 'Token',
        vs: ['new', 'replace', 'embed', 'other', 'none']
      }, {
        t: 'enum',
        ln: 'TypeType',
        bti: 'Token',
        vs: ['simple', 'extended', 'title', 'resource', 'locator', 'arc']
      }],
    eis: [{
        en: 'resource',
        ti: '.ResourceType'
      }, {
        en: 'title',
        ti: '.TitleEltType'
      }, {
        en: 'arc',
        ti: '.ArcType'
      }, {
        en: 'locator',
        ti: '.LocatorType'
      }]
  };
  return {
    XLink_1_0: XLink_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], XLink_1_0_Module_Factory);
}
else {
  var XLink_1_0_Module = XLink_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.XLink_1_0 = XLink_1_0_Module.XLink_1_0;
  }
  else {
    var XLink_1_0 = XLink_1_0_Module.XLink_1_0;
  }
}