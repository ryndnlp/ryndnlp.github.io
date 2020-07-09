import Home from './components/home.vue'
import CreateBlog from './components/createBlog.vue'
import ShowBlogs from './components/showBlogs.vue'
import Projects from './components/projects.vue'
import SingleBlog from './components/singleBlog'
import MainBlog from './components/mainBlog'
import Extractor from './components/extractor'

export default[
    {path: '/', component: Home },
    {path: '/projects', component: Projects},
    {path: '', component: MainBlog, 
        children: [
        {path: '/projects/blog-project/blog/:id', component: SingleBlog},
        {path:'/projects/blog-project/', component: ShowBlogs},
        {path:'/projects/blog-project/create', component: CreateBlog}
        ]
    },
    {path: '/projects/extractor', component: Extractor}
]


