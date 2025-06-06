import { Button, Modal } from "flowbite-react";
import { IoCloseSharp } from 'react-icons/io5';
import { motion } from "motion/react"

export const ModalTermsPolicy = ({ show, onClose, handleSubmit, loading }) => {
    return (
        <Modal dismissible show={show} onClose={onClose} >
                    <div className="p-relative flex max-h-[90dvh] flex-col rounded-t-lg bg-white shadow-sm">
                        <div className="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600 text-xl font-medium text-[var(--black)]">
                            <h1>Ketentuan Layanan</h1>
                            <div type="button" onClick={onClose} className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                                <IoCloseSharp className="h-5 w-5"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-6 bg-white">
                        <div className="space-y-6 mb-10">
                            <h2>1.	Syarat & Ketentuan Tentang Privasi</h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Kami menghargai privasi Anda sebagai pengguna website Adopt House. Sehubungan dengan layanan adopsi hewan yang kami sediakan, Anda dengan ini menyetujui bahwa alamat, alamat email, dan nomor telepon Anda akan kami kumpulkan dan simpan. Informasi pribadi ini akan kami gunakan secara eksklusif untuk memfasilitasi proses adopsi, yaitu dengan memberitahukan lokasi dan informasi kontak Anda kepada calon pengadopsi hewan yang Anda tawarkan. Dengan memberikan informasi ini, Anda memahami dan menyetujui bahwa informasi tersebut akan dibagikan kepada pihak ketiga yang berminat untuk mengadopsi hewan Anda.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Kami berkomitmen untuk menjaga keamanan data Anda sesuai dengan standar yang berlaku. Namun, perlu Anda pahami bahwa dalam konteks penggunaan informasi lokasi dan kontak Anda untuk keperluan adopsi hewan, potensi penyebaran data pribadi dapat terjadi di luar kendali langsung kami setelah informasi tersebut dibagikan kepada calon pengadopsi. Anda sepenuhnya bertanggung jawab atas konsekuensi yang mungkin timbul akibat penyebaran data pribadi Anda yang Anda berikan untuk keperluan adopsi hewan melalui platform kami, dan kami tidak bertanggung jawab atas kejadian penyebaran data tersebut setelah informasi dibagikan kepada pihak lain yang berkepentingan dalam proses adopsi.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Selain informasi kontak untuk keperluan adopsi, kami juga dapat mengumpulkan data mengenai preferensi hewan yang Anda sukai sebagai referensi. Data ini akan kami olah untuk memberikan rekomendasi hewan adopsi yang lebih sesuai dengan minat Anda di masa mendatang. Penggunaan data preferensi ini bertujuan untuk meningkatkan pengalaman Anda dalam menggunakan website kami dan membantu Anda menemukan hewan adopsi yang paling tepat.
                            </p>
                        </div>
                        <div className="space-y-6 mb-10">
                            <h2>2.	Syarat & Ketentuan Tentang Postingan Hewan</h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Sebagai pengguna yang memposting informasi mengenai hewan di website Adopt House. Anda sepenuhnya bertanggung jawab atas konten yang Anda unggah. Anda diwajibkan untuk memberikan deskripsi yang jujur dan akurat mengenai hewan peliharaan Anda, termasuk informasi tentang kesehatan, kondisi fisik, riwayat, perilaku, dan aspek relevan lainnya sesuai dengan keadaan sebenarnya hewan tersebut. Informasi yang Anda berikan akan menjadi dasar bagi calon pengadopsi untuk membuat keputusan, oleh karena itu kejujuran dan transparansi sangat diharapkan. Anda juga menjamin bahwa Anda memiliki hak penuh untuk memposting informasi dan gambar hewan tersebut dan tidak melanggar hak kekayaan intelektual atau hak privasi pihak lain. Kami berhak untuk meninjau, memoderasi, atau menghapus postingan yang kami anggap tidak sesuai dengan standar dan tujuan website kami tanpa pemberitahuan sebelumnya, termasuk postingan yang terindikasi memberikan informasi yang tidak benar atau menyesatkan.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Kami memberlakukan kebijakan nol toleransi terhadap segala bentuk penyalahgunaan platform kami melalui postingan. Hal-hal seperti penyebaran iklan ilegal (misalnya, penjualan hewan langka dilindungi), penyisipan iklan yang tidak sah atau tanpa sepengetahuan kami dalam postingan adopsi, pengunggahan gambar atau konten yang tidak senonoh, serta penggunaan kata atau kalimat yang tidak pantas atau mengandung unsur ujaran kebencian sangat dilarang. Kami akan mengambil tindakan tegas terhadap pelanggaran semacam itu, termasuk penghapusan postingan, penangguhan atau pemblokiran akun pengguna yang bersangkutan, dan tidak menutup kemungkinan untuk melaporkan pelanggaran tersebut kepada pihak berwenang sesuai dengan hukum yang berlaku di Indonesia.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Tindakan tegas ini kami lakukan demi menjaga keamanan, kenyamanan, dan integritas platform kami bagi seluruh pengguna serta melindungi reputasi website Adopt House. Dengan memposting informasi hewan, Anda setuju untuk mematuhi syarat dan ketentuan ini serta memahami bahwa segala konsekuensi hukum yang timbul akibat pelanggaran sepenuhnya menjadi tanggung jawab Anda. Kami berhak untuk melakukan perubahan pada syarat dan ketentuan postingan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.
                            </p>
                        </div>
                        <div className="space-y-6 mb-10">
                            <h2>3.	Syarat & Ketentuan Tentang Adopsi</h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Adopt House berperan sebagai platform yang menghubungkan antara pemilik hewan yang ingin memberikan adopsi dengan calon pengadopsi. Perlu dipahami bahwa Adopt House tidak terlibat dalam proses transaksi finansial atau perjanjian adopsi secara langsung. Segala bentuk kesepakatan, negosiasi, dan transaksi yang terjadi di luar platform Adopt House, termasuk namun tidak terbatas pada biaya adopsi, persyaratan adopsi tambahan, atau serah terima hewan, sepenuhnya merupakan tanggung jawab dan kesepakatan antara pihak pemilik hewan dan calon pengadopsi. Adopt House tidak bertanggung jawab atas segala hal yang mungkin timbul akibat kesepakatan atau transaksi di luar platform kami.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Kami menghimbau kepada seluruh pengguna untuk melakukan verifikasi dan berhati-hati dalam berinteraksi dengan pihak lain. Calon pengadopsi disarankan untuk bertemu langsung dengan hewan yang akan diadopsi, memeriksa kondisi kesehatan dan riwayatnya, serta memahami sepenuhnya persyaratan yang diajukan oleh pemilik hewan. Pemilik hewan juga diharapkan untuk melakukan seleksi calon pengadopsi dengan bijak demi kesejahteraan hewan di masa depan. Adopt House tidak bertanggung jawab atas kualitas hewan yang diadopsi, perilaku hewan setelah adopsi, atau perselisihan yang mungkin timbul antara pemilik hewan sebelumnya dan pengadopsi setelah proses adopsi terjadi di luar platform kami.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Dengan menggunakan fitur adopsi di Adopt House, Anda memahami dan menyetujui bahwa peran kami terbatas pada penyediaan platform untuk menghubungkan pihak-pihak yang berkepentingan. Kami tidak memberikan jaminan atau garansi apapun terkait proses adopsi yang terjadi di luar platform ini. Pengguna bertanggung jawab penuh atas segala keputusan dan risiko yang terkait dengan adopsi hewan yang difasilitasi melalui website kami. Kami berhak untuk melakukan perubahan pada syarat dan ketentuan ini sewaktu-waktu demi keamanan dan kenyamanan seluruh pengguna Adopt House.
                            </p>
                        </div>
                        <div className="space-y-6 mb-10">
                            <h2>4.	Syarat & Ketentuan Tentang Calon Pengadopsi</h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Sebagai calon pengadopsi yang menggunakan platform Adopt House, Anda menyatakan kesediaan penuh untuk bertanggung jawab atas segala kebutuhan hewan yang Anda adopsi. Ini mencakup penyediaan makanan yang layak, tempat tinggal yang aman dan nyaman, perawatan kesehatan yang memadai (termasuk vaksinasi dan pengobatan jika diperlukan), kasih sayang, serta perhatian yang berkelanjutan sesuai dengan kebutuhan spesies dan individu hewan yang Anda adopsi. Anda memahami bahwa mengadopsi hewan adalah komitmen jangka panjang yang memerlukan waktu, tenaga, dan sumber daya finansial.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Dengan mengajukan diri sebagai calon pengadopsi melalui Adopt House, Anda setuju untuk memberikan informasi yang benar dan lengkap mengenai diri Anda dan kemampuan Anda dalam merawat hewan. Informasi ini mungkin akan dibagikan kepada pemilik hewan yang Anda minati untuk diadopsi sebagai bagian dari proses seleksi. Kami menghimbau Anda untuk bersikap terbuka dan jujur dalam berkomunikasi dengan pemilik hewan mengenai pengalaman Anda sebelumnya dalam memelihara hewan, kondisi tempat tinggal Anda, serta rencana Anda untuk merawat hewan adopsi di masa depan.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Adopt House menyediakan platform untuk menghubungkan Anda dengan hewan yang membutuhkan rumah baru. Namun, keputusan akhir mengenai adopsi sepenuhnya berada di tangan pemilik hewan. Adopt House tidak dapat memberikan jaminan bahwa aplikasi adopsi Anda akan disetujui. Kami mendorong Anda untuk bersabar dan terus mencari hewan yang sesuai dengan kemampuan dan gaya hidup Anda. Dengan menggunakan platform ini, Anda menyadari bahwa Adopt House tidak bertanggung jawab atas perilaku atau kondisi kesehatan hewan setelah proses adopsi disetujui oleh pemilik hewan dan terjadi di luar platform kami.
                            </p>
                        </div>
                        <div className="space-y-6 mb-5">
                            <h2>5.	Syarat & Ketentuan Tentang Lainnya</h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Untuk melengkapi syarat dan ketentuan yang telah disebutkan sebelumnya, terdapat beberapa poin tambahan yang penting untuk diperhatikan demi keamanan dan kenyamanan seluruh pengguna Adopt House serta perlindungan platform kami. Terkait penggunaan data, penting untuk menegaskan bahwa meskipun kami berupaya melindungi informasi pribadi pengguna, keamanan data secara absolut tidak dapat dijamin. Pengguna bertanggung jawab untuk menjaga kerahasiaan informasi akun mereka dan berhati-hati dalam membagikan informasi pribadi kepada pihak lain di luar platform yang tidak terverifikasi. Kami berhak untuk melakukan pemantauan aktivitas pengguna di platform untuk mendeteksi dan mencegah aktivitas yang mencurigakan atau melanggar ketentuan, dan data yang terkumpul dapat digunakan untuk tujuan tersebut serta untuk meningkatkan kualitas layanan kami.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Dalam hal perlindungan platform Adopt House, segala tindakan yang dapat mengganggu operasional website, seperti upaya peretasan, penyebaran virus atau malware, atau penggunaan bot secara berlebihan, sangat dilarang. Kami berhak untuk mengambil tindakan hukum yang sesuai terhadap pihak-pihak yang terbukti melakukan tindakan merugikan terhadap platform kami. Selain itu, kami berhak untuk mengubah, menangguhkan, atau menghentikan sebagian atau seluruh layanan Adopt House sewaktu-waktu tanpa pemberitahuan sebelumnya. Pengguna diharapkan untuk secara berkala meninjau syarat dan ketentuan ini untuk mengetahui adanya perubahan.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Terakhir, penting untuk dipahami bahwa Adopt House beroperasi sebagai platform perantara dan tidak bertanggung jawab atas interaksi atau kesepakatan yang terjadi antar pengguna di luar platform. Kami menghimbau seluruh pengguna untuk berkomunikasi dengan baik, saling menghormati, dan bertindak dengan itikad baik dalam setiap interaksi terkait adopsi hewan. Jika terjadi perselisihan antar pengguna, Adopt House tidak berkewajiban untuk terlibat dalam penyelesaian sengketa tersebut. Dengan menggunakan Adopt House, Anda menyetujui seluruh syarat dan ketentuan yang telah ditetapkan.
                            </p>
                        </div>
                    </div>
                    <div  className="flex bg-white items-center space-x-2 rounded-b-lg border-gray-200 p-6 dark:border-gray-600 border-t">
                        <Button type="submit" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Menyetujui..." : "Saya Setuju"}
                        </Button>
                        <Button color="red" onClick={onClose} disabled={loading}>
                            Tidak Setuju
                        </Button>
                    </div>
                </Modal>
    )
}

export const ModalTermsPost = ({ show, onClose, handleSubmit, loading }) => {
    return (
                <Modal dismissible show={show} onClose={onClose} >
                    <div className="p-relative flex max-h-[90dvh] flex-col rounded-t-lg bg-white shadow-sm">
                        <div className="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600 text-xl font-medium text-[var(--black)]">
                            <h1>Ketentuan Layanan</h1>
                            <div type="button" onClick={onClose} className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                                <IoCloseSharp className="h-5 w-5"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-6 bg-white">
                        <div className="space-y-6 mb-10">
                            <h2>1.	Syarat & Ketentuan Tentang Privasi</h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Kami menghargai privasi Anda sebagai pengguna website Adopt House. Sehubungan dengan layanan adopsi hewan yang kami sediakan, Anda dengan ini menyetujui bahwa alamat, alamat email, dan nomor telepon Anda akan kami kumpulkan dan simpan. Informasi pribadi ini akan kami gunakan secara eksklusif untuk memfasilitasi proses adopsi, yaitu dengan memberitahukan lokasi dan informasi kontak Anda kepada calon pengadopsi hewan yang Anda tawarkan. Dengan memberikan informasi ini, Anda memahami dan menyetujui bahwa informasi tersebut akan dibagikan kepada pihak ketiga yang berminat untuk mengadopsi hewan Anda.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Kami berkomitmen untuk menjaga keamanan data Anda sesuai dengan standar yang berlaku. Namun, perlu Anda pahami bahwa dalam konteks penggunaan informasi lokasi dan kontak Anda untuk keperluan adopsi hewan, potensi penyebaran data pribadi dapat terjadi di luar kendali langsung kami setelah informasi tersebut dibagikan kepada calon pengadopsi. Anda sepenuhnya bertanggung jawab atas konsekuensi yang mungkin timbul akibat penyebaran data pribadi Anda yang Anda berikan untuk keperluan adopsi hewan melalui platform kami, dan kami tidak bertanggung jawab atas kejadian penyebaran data tersebut setelah informasi dibagikan kepada pihak lain yang berkepentingan dalam proses adopsi.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Selain informasi kontak untuk keperluan adopsi, kami juga dapat mengumpulkan data mengenai preferensi hewan yang Anda sukai sebagai referensi. Data ini akan kami olah untuk memberikan rekomendasi hewan adopsi yang lebih sesuai dengan minat Anda di masa mendatang. Penggunaan data preferensi ini bertujuan untuk meningkatkan pengalaman Anda dalam menggunakan website kami dan membantu Anda menemukan hewan adopsi yang paling tepat.
                            </p>
                        </div>
                        <div className="space-y-6 mb-10">
                            <h2>2.	Syarat & Ketentuan Tentang Postingan Hewan</h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Sebagai pengguna yang memposting informasi mengenai hewan di website Adopt House. Anda sepenuhnya bertanggung jawab atas konten yang Anda unggah. Anda diwajibkan untuk memberikan deskripsi yang jujur dan akurat mengenai hewan peliharaan Anda, termasuk informasi tentang kesehatan, kondisi fisik, riwayat, perilaku, dan aspek relevan lainnya sesuai dengan keadaan sebenarnya hewan tersebut. Informasi yang Anda berikan akan menjadi dasar bagi calon pengadopsi untuk membuat keputusan, oleh karena itu kejujuran dan transparansi sangat diharapkan. Anda juga menjamin bahwa Anda memiliki hak penuh untuk memposting informasi dan gambar hewan tersebut dan tidak melanggar hak kekayaan intelektual atau hak privasi pihak lain. Kami berhak untuk meninjau, memoderasi, atau menghapus postingan yang kami anggap tidak sesuai dengan standar dan tujuan website kami tanpa pemberitahuan sebelumnya, termasuk postingan yang terindikasi memberikan informasi yang tidak benar atau menyesatkan.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Kami memberlakukan kebijakan nol toleransi terhadap segala bentuk penyalahgunaan platform kami melalui postingan. Hal-hal seperti penyebaran iklan ilegal (misalnya, penjualan hewan langka dilindungi), penyisipan iklan yang tidak sah atau tanpa sepengetahuan kami dalam postingan adopsi, pengunggahan gambar atau konten yang tidak senonoh, serta penggunaan kata atau kalimat yang tidak pantas atau mengandung unsur ujaran kebencian sangat dilarang. Kami akan mengambil tindakan tegas terhadap pelanggaran semacam itu, termasuk penghapusan postingan, penangguhan atau pemblokiran akun pengguna yang bersangkutan, dan tidak menutup kemungkinan untuk melaporkan pelanggaran tersebut kepada pihak berwenang sesuai dengan hukum yang berlaku di Indonesia.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Tindakan tegas ini kami lakukan demi menjaga keamanan, kenyamanan, dan integritas platform kami bagi seluruh pengguna serta melindungi reputasi website Adopt House. Dengan memposting informasi hewan, Anda setuju untuk mematuhi syarat dan ketentuan ini serta memahami bahwa segala konsekuensi hukum yang timbul akibat pelanggaran sepenuhnya menjadi tanggung jawab Anda. Kami berhak untuk melakukan perubahan pada syarat dan ketentuan postingan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.
                            </p>
                        </div>
                        <div className="space-y-6 mb-5">
                            <h2>3.	Syarat & Ketentuan Tentang Lainnya</h2>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Untuk melengkapi syarat dan ketentuan yang telah disebutkan sebelumnya, terdapat beberapa poin tambahan yang penting untuk diperhatikan demi keamanan dan kenyamanan seluruh pengguna Adopt House serta perlindungan platform kami. Terkait penggunaan data, penting untuk menegaskan bahwa meskipun kami berupaya melindungi informasi pribadi pengguna, keamanan data secara absolut tidak dapat dijamin. Pengguna bertanggung jawab untuk menjaga kerahasiaan informasi akun mereka dan berhati-hati dalam membagikan informasi pribadi kepada pihak lain di luar platform yang tidak terverifikasi. Kami berhak untuk melakukan pemantauan aktivitas pengguna di platform untuk mendeteksi dan mencegah aktivitas yang mencurigakan atau melanggar ketentuan, dan data yang terkumpul dapat digunakan untuk tujuan tersebut serta untuk meningkatkan kualitas layanan kami.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Dalam hal perlindungan platform Adopt House, segala tindakan yang dapat mengganggu operasional website, seperti upaya peretasan, penyebaran virus atau malware, atau penggunaan bot secara berlebihan, sangat dilarang. Kami berhak untuk mengambil tindakan hukum yang sesuai terhadap pihak-pihak yang terbukti melakukan tindakan merugikan terhadap platform kami. Selain itu, kami berhak untuk mengubah, menangguhkan, atau menghentikan sebagian atau seluruh layanan Adopt House sewaktu-waktu tanpa pemberitahuan sebelumnya. Pengguna diharapkan untuk secara berkala meninjau syarat dan ketentuan ini untuk mengetahui adanya perubahan.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Terakhir, penting untuk dipahami bahwa Adopt House beroperasi sebagai platform perantara dan tidak bertanggung jawab atas interaksi atau kesepakatan yang terjadi antar pengguna di luar platform. Kami menghimbau seluruh pengguna untuk berkomunikasi dengan baik, saling menghormati, dan bertindak dengan itikad baik dalam setiap interaksi terkait adopsi hewan. Jika terjadi perselisihan antar pengguna, Adopt House tidak berkewajiban untuk terlibat dalam penyelesaian sengketa tersebut. Dengan menggunakan Adopt House, Anda menyetujui seluruh syarat dan ketentuan yang telah ditetapkan.
                            </p>
                        </div>
                    </div>
                    <div className="flex bg-white items-center space-x-2 rounded-b-lg border-gray-200 p-6 dark:border-gray-600 border-t">
                        <Button type="submit" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Menyetujui..." : "Saya Setuju"}
                        </Button>
                        <Button color="red" onClick={onClose} disabled={loading}>
                            Tidak Setuju
                        </Button>
                    </div>
                </Modal>
    )
}