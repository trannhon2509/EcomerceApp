import React, { Component } from 'react';
import BlogCard from '../components/BlogCard';
import '../assets/css/Blog.css';
import LatestPostItem from '../components/LatestPostItem';
import LatestTags from '../components/LatestTags';

export default class Blog extends Component {
  render() {

    const latestTags = ['Design', 'Development', 'Travel', 'Web Design', 'Marketing', 'Research', 'Managment'];
      const blogs = [
          {
              date: "September.15.2021",
              content:
                  "Tiếp cận một ngôi nhà hay không gian làm việc thoải mái và ấm áp không chỉ là việc sắp xếp đồ đạc mà còn là việc tạo không khí thích hợp. Trong số những phụ kiện tạo không gian ấy, nến thơm và sáp thơm không chỉ làm cho căn phòng bạn thơm phức mà còn giúp tạo ra một cảm giác thư giãn và yên bình. Hãy cùng khám phá những sản phẩm này và cách chúng có thể làm cho cuộc sống của bạn trở nên tươi mới hơn."
                  + "Nến thơm: Nến thơm không chỉ là nguồn ánh sáng mềm mại mà còn làm cho không gian trở nên ấm áp hơn với hương thơm dễ chịu.Các loại nến thơm có thể được làm từ các thành phần tự nhiên như sáp ong, dầu thơm tự nhiên như hoa hồng, cam bergamot, hoa lavender, hay các loại hương gỗ như sồi và hổ phách.Dù bạn muốn tạo ra một không gian thư giãn sau một ngày làm việc căng thẳng hoặc muốn tạo một không gian lãng mạn cho bữa tối cuối tuần, có một loại nến thơm phù hợp với mọi tình huống."
                  + " Sáp thơm treo: Sáp thơm treo là một lựa chọn khác thú vị cho những người không muốn sử dụng nến.Chúng được làm từ các loại sáp và tinh dầu thơm, được đặt trong các hình dạng nhỏ gọn và treo lên trong không gian.Khi sáp tiếp xúc với không khí, hương thơm tỏa ra một cách dịu dàng và lâu dài.Sự tiện lợi của sáp thơm treo là bạn có thể dễ dàng di chuyển chúng và treo chúng ở bất kỳ nơi nào trong nhà mà bạn muốn."
                  + "Không chỉ mang lại hương thơm dễ chịu, các sản phẩm nến thơm và sáp thơm còn có thể giúp giảm căng thẳng và lo lắng, tạo cảm giác thư giãn và tăng cường tinh thần.Với sự đa dạng về hương thơm và chức năng, chúng là một phần không thể thiếu để tạo ra một không gian sống và làm việc lý tưởng.",
              title: "Hương Thơm và Sự Thư Giãn: Khám Phá Văn Phòng và Nhà Của Bạn"
          },
          {
              date: "September.15.2021",
              content:
                  "Chào mừng đến với \"Tạo Phong Cách với Scrunchies, Bandana và Kẹp Tóc!\" Bạn đã bao giờ muốn thêm một chút cái gì đó đặc biệt vào phong cách hàng ngày của mình mà không cần quá nhiều công đoạn? Hãy để chúng tôi giới thiệu cho bạn ba sản phẩm nhỏ nhưng đầy phong cách: scrunchies, bandana và kẹp tóc. Scrunchies - Sự Quay Trở Lại của Phong Cách Retro: Được biết đến từ những năm 80 và 90, scrunchies đang trở lại mạnh mẽ trong thế giới thời trang. Khác với những chiếc dây thừng thông thường, scrunchies có thể làm cho bất kỳ búi tóc nào trở nên dễ thương và phong cách hơn. Bạn có thể chọn từ một loạt các chất liệu và màu sắc, từ những mảnh vải mềm mại đến những kiểu da cá tính. Bandana - Sự Đa Dạng và Tiện Lợi: Từ việc đeo trên đầu, sử dụng như một phụ kiện cho túi xách, hoặc thậm chí làm cổ áo, bandana là một mảnh vải linh hoạt có thể tạo ra nhiều phong cách khác nhau. Với các mẫu in độc đáo và màu sắc tươi sáng, bạn có thể biến bất kỳ bộ trang phục nào trở nên thú vị và nổi bật. Kẹp Tóc - Sự Linh Hoạt và Thuận Tiện: Từ những chiếc kẹp đơn giản đến những thiết kế phức tạp hơn, kẹp tóc là một phụ kiện không thể thiếu trong hộp đồ trang điểm của mỗi cô gái. Chúng có thể được sử dụng để tạo kiểu tóc hoặc giữ tóc gọn gàng trong khi làm việc. Với một loạt các kiểu dáng và chất liệu, bạn có thể chọn lựa kẹp tóc phù hợp với bất kỳ phong cách nào. Với scrunchies, bandana và kẹp tóc, bạn có thể thêm một chút cá tính và sự sáng tạo vào phong cách cá nhân của mình mỗi ngày mà không cần quá nhiều cố gắng. Hãy thử và tạo ra những tổ hợp độc đáo của riêng bạn và khám phá thế giới vô tận của thời trang!",
              title: "Tạo Phong Cách với Scrunchies, Bandana và Kẹp Tóc!"
          },
          {
              date: "September.15.2021",
              content:
                  "Hương thơm, dù nhỏ bé, lại là một phần không thể thiếu trong cuộc sống hàng ngày của chúng ta. Từ mùi của cà phê sáng sớm đến hương thơm dịu dàng của hoa quả tươi mới, những hương vị này không chỉ làm cho không gian của chúng ta trở nên thú vị hơn mà còn gợi lại những ký ức đáng nhớ. *Hương Thơm Trong Gia Đình Trong gia đình, hương thơm thường được tạo ra từ những món ăn được chuẩn bị hàng ngày. Mùi thơm của bữa sáng nồng nàn từ bánh mì nướng, hương thơm của một nồi canh đầy ấm áp vào buổi tối, hoặc cảm giác dễ chịu từ một ly trà thảo mộc vào buổi tối. Những hương thơm này không chỉ làm cho căn bếp trở nên sống động mà còn kích thích vị giác và mang lại cảm giác bình yên trong gia đình. *Hương Thơm Trong Làm Việc Trên nơi làm việc, hương thơm có thể đóng vai trò quan trọng trong việc tạo ra một môi trường làm việc tích cực. Một mùi hương nhẹ nhàng từ cây cỏ hoặc hoa nhài có thể giúp giảm căng thẳng và tăng cường tinh thần cho nhân viên. Ngoài ra, các sản phẩm làm thơm không khí như nến thơm hoặc máy phát hương cũng được sử dụng phổ biến để tạo ra một không gian làm việc thoải mái và tràn ngập hương thơm dễ chịu. *Hương Thơm Trong Thư Giãn Cuối cùng, hương thơm cũng là một phần quan trọng trong việc thư giãn và tận hưởng cuộc sống. Một bình hoa hồng tươi thắm trong phòng khách, một cây nến lavender phát ra hương thơm dịu dàng trong phòng ngủ, hay một bộ sưu tập tinh dầu thảo mộc để tạo ra không gian spa tại nhà. Những hương thơm này giúp ta tạo ra những khoảnh khắc thư giãn và tận hưởng cuộc sống đúng nghĩa. Tóm lại, hương thơm là một phần không thể thiếu trong cuộc sống hàng ngày của chúng ta, không chỉ làm cho không gian trở nên thú vị hơn mà còn tạo ra những trải nghiệm đầy ý nghĩa và đáng nhớ. Hãy để những hương thơm này dẫn dắt chúng ta qua mỗi ngày và tạo ra những kỷ niệm đẹp trong cuộc sống.",
              title: "Hương Thơm: Sự Tinh Tế Trong Cuộc Sống Hàng Ngày"
          },
          {
              date: "September.15.2021",
              content:
                  "Trong cuộc sống, không phải lúc nào những món quà đắt tiền mới là những món quà có ý nghĩa nhất. Thỉnh thoảng, những món quà nhỏ bé, dù đơn giản nhưng chứa đựng những tình cảm sâu sắc và ý thức tình yêu không thể nào đong đếm được. Dưới đây là một số ý nghĩa mà những món quà nhỏ có thể mang lại: 1. Biểu Tượng của Sự Chăm Sóc: Những món quà nhỏ như scrunchies, bandana hoặc kẹp tóc có thể là biểu tượng của sự chăm sóc và quan tâm tới người nhận. Dù chúng không có giá trị vật chất lớn, nhưng việc chọn lựa và tặng những món quà như vậy cho người khác thể hiện sự quan tâm và ý thức về sở thích và nhu cầu của họ. 2. Tạo Ra Những Kỷ Niệm Đáng Nhớ: Những món quà nhỏ có thể kết hợp với những sự kiện đặc biệt, như ngày kỷ niệm, sinh nhật hoặc những dịp đặc biệt khác. Mặc dù chúng có thể không đắt tiền, nhưng sẽ trở thành những kỷ niệm đáng nhớ và mang lại niềm vui mỗi khi người nhận nhìn thấy hoặc sử dụng chúng. 3. Thể Hiện Sự Quan Tâm và Sự Ý Thức Về Người Nhận: Những món quà nhỏ thường đòi hỏi người tặng phải dành thời gian và tâm huyết để lựa chọn và chuẩn bị. Việc này thể hiện sự quan tâm và sự ý thức về người nhận, khiến họ cảm thấy được đánh giá và quý trọng. 4. Mang Lại Sự Sống Động và Hạnh Phúc Hàng Ngày: Những món quà nhỏ như scrunchies, bandana hoặc kẹp tóc có thể mang lại sự sống động và hạnh phúc hàng ngày. Mỗi khi người nhận nhìn thấy hoặc sử dụng chúng, họ có thể nhớ đến người tặng và cảm nhận được tình cảm ấm áp mà món quà mang lại. Trên tất cả, những món quà nhỏ như scrunchies, bandana và kẹp tóc không chỉ là các món đồ thông thường, mà còn là biểu tượng của sự chăm sóc, ý thức và tình yêu. Hãy nhớ rằng, giá trị của một món quà không phụ thuộc vào giá trị vật chất, mà phụ thuộc vào tình cảm và ý nghĩa mà nó chứa đựng.",
              title: "Ý Nghĩa của Những Món Quà Nhỏ Bé: Sự Chăm Sóc và Ý Thức Tình Yêu"
          }
      ];

    return (
      <section className="blog-listing">
        <div className="container">
          <div className="row align-items-start">

            <div className="col-lg-4 m-15px-tb blog-aside">
              <div className="widget widget-author">
                <div className="widget-title">
                  <h3>Author</h3>
                </div>
                <div className="widget-body">
                  <div className="media align-items-center">
                    <div className="avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Author" />
                    </div>
                    <div className="media-body">
                      <h6>Hello, I'm<br /> Rachel Roth</h6>
                    </div>
                  </div>
                  <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                    websites, web services and online stores</p>
                </div>
              </div>
              <div className="widget widget-post">
                <div className="widget-title">
                  <h3>Trending Now</h3>
                </div>
                <div className="widget-body">
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                </div>
              </div>
              <div className="widget widget-latest-post">
                <div className="widget-title">
                  <h3>Latest Post</h3>
                </div>
                <div className="widget-body">
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                </div>
              </div>
              <LatestTags tags={latestTags} />
            </div>
            <div className="col-lg-8 m-15px-tb">
              <div className="row">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={index}
                    date={blog.date}
                    content={blog.content}
                    title={blog.title}
                  />
                ))}

                <div className="col-12">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1}><i className="fas fa-chevron-left" /></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active">
                      <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#"><i className="fas fa-chevron-right" /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
