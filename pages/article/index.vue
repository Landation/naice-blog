<template>
  <div class="articleBox">
    <main class="box main">
      <section class="article">
        <div class="item" v-for="(item, index) in article" :key="index">
          <a href="javascript:void(0)" class="article-title" @click="goDetail(item.id, article)">
            <h2>{{item.title}}</h2>
          </a>
          <p class="article-desc">{{item.descript}}</p>
          <div class="article-info">
            <span class="time">{{toTime(item.updateAt, '.')}}</span>
            <i class="iconfont">&#xe600;</i>
            <span class="time">
              <strong v-if="item.meta">{{item.meta.views}}</strong>次阅读
            </span>
            <i class="iconfont">&#xe600;</i>
            <span class="time">
              <strong v-if="item.meta">{{item.meta.comments}}</strong>条评论
            </span>
            <i class="iconfont">&#xe600;</i>
            <span class="time">
              <strong v-if="item.meta">{{item.meta.likes}}</strong>人喜欢
            </span>
          </div>
        </div>
        <div class="loadmore" v-if="!hasMore">没有更多数据了</div>
        <div class="loadmore" v-else>
          <span v-if="isLoadingData">数据加载中...</span>
        </div>
      </section>
      <section class="side">
        <div class="hot" id="sideHot">
          <div class="hot-title">热门文章</div>
          <div class="hot-article">
            <h3
              v-for="(item, index) in hotArticle"
              :key="index"
              @click="goDetail(item.id, hotArticle)"
            >
              <a href="javascript:void(0)">{{item.title}}</a>
            </h3>
          </div>
        </div>
        <div :class="showFixedTag ? 'fixedTag' : ''">
          <div class="tags" id="tags">
            <div class="hot-title">标签</div>
            <div class="tag-list">
              <nuxt-link
                v-for="(item, index) in tags.data"
                :key="index"
                :to="`/article?tag=${item.id}`"
              >
                {{item.name}}
                <span>({{item.count}})</span>
              </nuxt-link>
            </div>
          </div>
          <div class="smallNav">
            <div class="flag"></div>
            <div>
              <nuxt-link to="/about">我</nuxt-link>
              <i>•</i>
              <nuxt-link to="/hero">留言墙</nuxt-link>
              <i>•</i>
              <nuxt-link to="/allarticle">归档</nuxt-link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <to-top></to-top>
  </div>
</template>

<script>
import { getArticle, getHotArticle, getTag } from "../../api";
import ToTop from "../../components/toTop.vue";
import FooterMixin from "../../utils/footer-mixin";
import TimeMixin from "../../utils/time-mixin";

let page = 1;
let lastId = "";
let currectTag = "";
let fetchTags = getTag();
let fetchHotArticle = getHotArticle();
//let fetchArticle = getArticle({ current_page: page });
let fetchPageArticle = getArticle({ lastId: lastId });
export default {
  head() {
    return {
      title: "naice | 文章"
    };
  },
  layout: "layout",
  mixins: [FooterMixin, TimeMixin],
  components: {
    ToTop
  },
  async asyncData({ params }) {
    console.log(params);
    const tags = await fetchTags;
    const articles = await fetchPageArticle;
    const hotArticle = await fetchHotArticle;
    console.log(articles);
    console.log(lastId);
    return {
      tags,
      article: articles.data,
      hotArticle: hotArticle.data
    };
  },
  data() {
    return {
      showFixedTag: false,
      sideHot: null,
      isLoadingData: false,
      hasMore: true, //没有分页默认获取所有
      page: page,
      lastId: lastId
    };
  },
  computed: {
    scrollTop() {
      return this.$store.state.scrollTop;
    }
  },
  methods: {
    loadMore(opts = {}) {
      if (this.hasMore) {
        this.isLoadingData = true;
        this.page += 1;
        let params = { current_page: this.page, ...opts };
        this.lastId =this.article.length!=0?this.article[this.article.length - 1].id:"";
        console.log(this.lastId);

        if(opts.tag == null&&this.currectTag!="")
        {
          opts.tag= this.currectTag
        }
        let params2 = { lastId: this.lastId, ...opts};    
        getArticle(params2)
          .then(res => {
            this.isLoadingData = false;
            let arr = [];
            console.log(opts);
            console.log(res);
            console.log(`111${opts.tag != null}`);
            if (opts.tag != null || opts.keyword || opts.isNew) {
              arr =this.article.concat(res.data);
            } else {
              console.log("hello");
              arr = this.article.concat(res.data);
            }
            this.article = arr;
            //this.$store.commit('getArticle', arr)
            console.log(res.data.length);


            if (res.data.length < 10) {
              this.hasMore = false;
            }

            this.$nextTick(() => {
              this.footer();
            });
          })
          .catch(err => {
            this.isLoadingData = false;
          });
      }
    },
    goDetail(id, data) {
      const arr = data.filter(item => item.id == id);
      this.$store.commit("selectArticle", arr[0]);
      this.$router.push("/article/" + id);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.sideHot = document.querySelector("#sideHot");
      this.mailContentDom = document.querySelector("#mailContent");
      this.windowHeight = document.documentElement.clientHeight;
      this.footer();
      window.addEventListener("scroll", e => {
        const top = $(document).scrollTop();
        const mailContentDomHeight = this.mailContentDom.offsetHeight;
        this.showFixedTag = top >= this.sideHot.offsetHeight + 80;
        if (
          this.windowHeight + top > mailContentDomHeight - 50 &&
          !this.isLoadingData &&
          this.hasMore
        ) {
          this.loadMore();
        }
      });
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.tag || to.query.keyword) {
        vm.loadMore(to.query);
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.page = 0;
    this.lastId = "";
    this.hasMore = true;
    this.currectTag ="";
    console.log("进入了新的路由");
    if (to.query.tag || to.query.keyword) {
      this.article = []
      this.currectTag = to.query.tag
      console.log(to.query)
      this.loadMore(to.query);
    } else {
      this.loadMore({ isNew: true });
    }
    next();
  }
};
</script>

<style scoped>
.main {
  clear: both;
  overflow: hidden;
}

.article {
  width: 620px;
  float: left;
  box-sizing: border-box;
  background: transparent;
}

.item {
  padding: 24px 18px;
  overflow: hidden;
  position: relative;
  /* border-bottom: 1px solid #f1f1f1; */
}

.item:last-child::after {
  width: 0px;
}

.item::after {
  content: "";
  display: block;
  position: absolute;
  height: 1px;
  background-color: #f1f1f1;
  bottom: 0;
  left: 0;
  width: 150px;
}

.item .article-title {
  margin-bottom: 15px;
  font-size: 16px;
  display: block;
}

.item .article-title h2 {
  font-weight: normal;
  font-size: 20px;
  display: inline-block;
  position: relative;
}

.item .article-title h2::after {
  content: "";
  display: block;
  position: absolute;
  height: 1px;
  background-color: #555;
  bottom: 0;
  left: 0;
  width: 100%;
  transform-origin: center center;
  transform: scaleX(0);
  transition: 0.3s;
}

.item .article-title:hover h2::after {
  transform: scaleX(1);
}

.item .article-desc {
  line-height: 24px;
  /* text-indent: 24px; */
  color: #777;
}

.item .article-info {
  margin-top: 20px;
  color: #8c8c8c;
  font-size: 12px;
}

.item .article-info i,
.item .article-info strong {
  font-size: 12px;
}

.side {
  width: 250px;
  float: right;
  box-sizing: border-box;
  padding-top: 24px;
}
.tagSide {
  width: 250px;
  box-sizing: border-box;
  padding-top: 24px;
  position: fixed;
  left: 50%;
  margin-left: 200px;
  top: 24px;
}
.hot-title {
  font-size: 16px;
}
.hot-article,
.tag-list {
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 6px;
}
.hot-article h3 {
  font-weight: normal;
  line-height: 40px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tags {
  margin-top: 24px;
}
.tag-list a {
  display: inline-block;
  padding: 10px;
}
.loadmore {
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  color: #cccccc;
}
.smallNav {
  margin-top: 20px;
  width: 100%;
  position: relative;
  color: #797979;
}
.flag {
  width: 35%;
  height: 1px;
  background: #f1f1f1;
  margin-bottom: 20px;
}
.smallNav a {
  padding: 0 5px;
  color: #797979;
}
.fixedTag {
  position: fixed;
  width: 250px;
  top: 60px;
}
</style>
