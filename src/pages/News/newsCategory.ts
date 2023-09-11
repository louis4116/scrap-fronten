import { useGetCnaNewsQuery } from "../../api/newsApi";
import { useGetLtnNewsQuery } from "../../api/newsApi";
import { useGetLtnMilitaryQuery } from "../../api/newsApi";
import { useGetUdnNewsQuery } from "../../api/newsApi";
export const newsCategory = [
    {
      path:"cna",
      fn:useGetCnaNewsQuery,
      content:[
        {
          name: '即時',
          url: 'aall',
        },
        {
          name: '政治',
          url: 'aipl',
        },
        {
          name: '國際',
          url: 'aopl',
        },
        {
          name: '兩岸',
          url: 'acn',
        },
        {
          name: '產經',
          url: 'aie',
        },
        {
          name: '證券',
          url: 'asc',
        },
        {
          name: '科技',
          url: 'ait',
        },
        {
          name: '生活',
          url: 'ahel',
        },
        {
          name: '社會',
          url: 'asoc',
        },
        {
          name: '地方',
          url: 'aloc',
        },
        {
          name: '文化',
          url: 'acul',
        },
        {
          name: '運動',
          url: 'aspt',
        },
        {
          name: '娛樂',
          url: 'amov',
        },
        {
          name: '專題',
          url: 'newstopic',
        } 
      ]
    },
    {
      path:"ltn",
      fn:useGetLtnNewsQuery,
      content:[
        {
            name:"即時",
            url:"all"
          },
          {
            name: '熱門',
            url: 'popular',
          },
          {
            name: '政治',
            url: 'politics',
          },
          {
            name: '社會',
            url: 'society',
          },
          {
            name: '生活',
            url: 'life',
          },
          {
            name: '國際',
            url: 'world',
          },
          {
            name: '地方',
            url: 'local',
          },
          {
            name: '蒐奇',
            url: 'novelty',
          },
      ]
    },
    {
        path:"military",
        fn:useGetLtnMilitaryQuery,
        content:[
            {
                name: '軍情動態',
                url: 'breakingnewslist',
              },
              {
                name: '國防MIT',
                url: 'mitlist',
              },
              {
                name: '軍武百科',
                url: 'pedialist',
              },
              {
                name: '國防秘辛',
                url: 'historylist',
              },
              {
                name: '軍武書摘',
                url: 'filelist',
              },
              {
                name: '自由講武堂',
                url: 'forumlist',
              },
              {
                name: '軍情人物',
                url: 'peoplelist',
              },
        ]
    },
    {
        path:"udn",
        fn:useGetUdnNewsQuery,
        content:[
            {
                name: '精選',
                url: '0',
              },
              {
                name: '不分類',
                url: '99',
              },
              {
                name: '要聞',
                url: '1',
              },
              {
                name: '娛樂',
                url: '8',
              },
              {
                name: '社會',
                url: '2',
              },
              {
                name: '地方',
                url: '3',
              },
              {
                name: '國際',
                url: '5',
              },
              {
                name: '兩岸',
                url: '4',
              },
              {
                  name: '財經',
                  url: '6',
                },
                {
                  name: '股市',
                  url: '11',
                },
                {
                  name: '運動',
                  url: '7',
                },
                {
                  name: '生活',
                  url: '9',
                },
                {
                  name: '科技',
                  url: '13',
                },
                {
                  name: '文教',
                  url: '12',
                },
        ]
    }
];