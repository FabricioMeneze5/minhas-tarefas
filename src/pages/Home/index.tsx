import AddButtom from '../../components/AddButtom'
import SideBar from '../../containers/SideBar'
import TasksList from '../../containers/TasksList'

const Home = () => (
  <>
    <SideBar showFilter />
    <TasksList />
    <AddButtom />
  </>
)

export default Home
