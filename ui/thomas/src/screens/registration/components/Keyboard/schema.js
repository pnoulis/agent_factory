import back_a from '../../../../assets/images/back_a.png'
import back_b from '../../../../assets/images/back_b.png'
import up_a from '../../../../assets/images/up_a.png'
import up_b from '../../../../assets/images/up_b.png'

const KEYBOARD_SIDES = {
    FRONT:'FRONT',
    BACK:'BACK'
}

const schema = ({
    [KEYBOARD_SIDES.FRONT]:[{
        key:'q',
        line:1
    },{
        key:'w',
        line:1
    },{
        key:'e',
        line:1
    },{
        key:'r',
        line:1
    },{
        key:'t',
        line:1
    },{
        key:'y',
        line:1
    },{
        key:'u',
        line:1
    },{
        key:'i',
        line:1
    },{
        key:'o',
        line:1
    },{
        key:'p',
        line:1
    },{
        key:'back',
        line:1,
        renderer:()=>{
            return <img src={back_a} />
        }
    },{
        key:'a',
        line:2
    },{
        key:'s',
        line:2
    },{
        key:'d',
        line:2
    },{
        key:'f',
        line:2
    },{
        key:'g',
        line:2
    },{
        key:'h',
        line:2
    },{
        key:'j',
        line:2
    },{
        key:'k',
        line:2
    },{
        key:'l',
        line:2
    },{
        key:'submit',
        line:2
    },{
        key:'shift',
        line:3,
        renderer:()=>{
            return <img src={up_a} />
        }
    },{
        key:'z',
        line:3
    },{
        key:'x',
        line:3
    },{
        key:'c',
        line:3
    },{
        key:'v',
        line:3
    },{
        key:'b',
        line:3
    },{
        key:'n',
        line:3
    },{
        key:'m',
        line:3
    },{
        key:'.',
        line:3
    },{
        key:'@',
        line:3
    },{
        key:'shift',
        line:3,
        renderer:()=>{
            return <img src={up_a} />
        }
    },{
        key:'sidechanger',
        line:4,
        renderer:()=>{
            return <span>&#46;&#63;123</span>
        },
        extraclasses:[
           "ten_percent"
        ]
        }
        ,{
            key:'space',
            line:4,
            renderer:()=>{
                return null
            },
            extraclasses:[
                "twenty_percent"
            ]
        },{
            key:'space',
            line:4,
            renderer:()=>{
                return null
            },
            extraclasses:[
                "forty_percent"
        ]
        },{
            key:'_',
            line:4,
            renderer:()=>{
                return <span>_</span>
            },
            extraclasses:[
                "ten_percent"
            ]
        },{
            key:'-',
            line:4,
            renderer:()=>{
                return <span>-</span>
            },
            extraclasses:[
                "ten_percent"
            ]
        },{
            key:'empty',
            line:4,
            renderer:()=>{
                return <span></span>
            },
            extraclasses:[
                "ten_percent",
                "noborder"
            ]
        }
    ],
    [KEYBOARD_SIDES.BACK]:[{
        key:'1',
        line:1
    },{
        key:'2',
        line:1
    },{
        key:'3',
        line:1
    },{
        key:'4',
        line:1
    },{
        key:'5',
        line:1
    },{
        key:'6',
        line:1
    },{
        key:'7',
        line:1
    },{
        key:'8',
        line:1
    },{
        key:'9',
        line:1
    },{
        key:'0',
        line:1
    },{
        key:'back',
        line:1,
        renderer:()=>{
            return <img src={back_b} />
        }
    },{
        key:':',
        line:2,
        renderer:()=>{
            return <span>&#58;</span>
        }
    },{
        key:';',
        line:2,
        renderer:()=>{
            return <span>&#59;</span>
        }
    },{
        key:'%',
        line:2,
        renderer:()=>{
            return <span>&#37;</span>
        }
    },{
        key:'#',
        line:2,
        renderer:()=>{
            return <span>&#35;</span>
        }
    },{
        key:'(',
        line:2,
        renderer:()=>{
            return <span>&#40;</span>
        }
    },{
        key:')',
        line:2,
        renderer:()=>{
            return <span>&#41;</span>
        }
    },{
        key:'{',
        line:2,
        renderer:()=>{
            return <span>&#123;</span>
        }
    },{
        key:'}',
        line:2,
        renderer:()=>{
            return <span>&#125;</span>
        }
    },{
        key:'"',
        line:2,
        renderer:()=>{
            return <span>&#34;</span>
        }
    },{
        key:'submit',
        line:2
    },{
        key:'shift',
        line:3,
        renderer:()=>{
            return <img src={up_b} />
        }
    },{
        key:'\'',
        line:3,
        renderer:()=>{
            return <span>&#39;</span>
        }
    },{
        key:'!',
        line:3,
        renderer:()=>{
            return <span>&#33;</span>
        }
    },{
        key:'*',
        line:3,
        renderer:()=>{
            return <span>&#42;</span>
        }
    },{
        key:'=',
        line:3,
        renderer:()=>{
            return <span>&#61;</span>
        }
    },{
        key:'+',
        line:3,
        renderer:()=>{
            return <span>&#43;</span>
        }
    },{
        key:'/',
        line:3,
        renderer:()=>{
            return <span>&#47;</span>
        }
    }, {
        key:'\\',
        line:3,
    },{
        key:'|',
        line:3,
        renderer:()=>{
            return <span>&#124;</span>
        }
    },{
        key:'.',
        line:3,
        renderer:()=>{
            return <span>&#46;</span>
        }
    },{
        key:'shift',
        line:3,
        renderer:()=>{
            return <img src={up_b} />
        }
    },{
        key:'sidechanger',
        line:4,
        renderer:()=>{
            return <span>ABC</span>
        },
        extraclasses:[
            "ten_percent",
            "backside"
        ]
    }
        ,{
            key:'space',
            line:4,
            renderer:()=>{
                return null
            },
            extraclasses:[
                "twenty_percent",
                "backside"
            ]
        },{
            key:'space',
            line:4,
            renderer:()=>{
                return null
            },
            extraclasses:[
                "forty_percent",
                "backside"
        ]
        },{
            key:'_',
            line:4,
            renderer:()=>{
                return <span>_</span>
            },
            extraclasses:[
                "ten_percent",
                "backside"
            ]
        },{
            key:'-',
            line:4,
            renderer:()=>{
                return <span>-</span>
            },
            extraclasses:[
                "ten_percent",
                "backside"
            ]
        },{
            key:'empty',
            line:4,
            renderer:()=>{
                return <span></span>
            },
            extraclasses:[
                "ten_percent",
                "noborder",
                "backside"
            ]
        }]
})

export default schema;
