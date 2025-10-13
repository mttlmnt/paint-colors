require "nokogiri"
require "httparty"
require "optparse"
require "json"

def download_index_page(page, letter:)
  response = HTTParty.get("https://www.resene.co.nz/swatches/search.php?page=#{page}&type=letter&letter=#{letter}", verify: false)
  response.body if response.code == 200 && !response.body.include?("No swatches found")
end

def download_index_pages
  ("a".."z").each do |letter|
    (1..1000).each do |page|
      path = "_scratch/index_pages/#{letter}_#{page}.html"
      break if File.exist?(path)
      content = download_index_page(page, letter: letter)
      break if !content
      open(path, "wb") do |io|
        io.write(content)
        puts path
      end
    end
  end
end

####

IndexPageInfo = Struct.new(:code, :url_path) do
end

def extract_items_from_index_page(file_path)
  doc = Nokogiri::HTML(File.read(file_path))
  trs = doc.xpath("//table/tr/td/table//tr")
  puts file_path
  items = (1..6).collect do |i|
    codes_tr = trs[3]
    if codes_tr
      codes = codes_tr.xpath("td").children.map { |c| c.text.strip }
      links_tr = trs[6]
      urls = links_tr.xpath("td//a").map { |a| a.attribute("href").text }.select { |href| href.start_with? "preview" }
      8.times { trs.shift }
      codes.zip(urls).map do |code, url|
        # Only include new-style color codes
        if code.count('-') == 2
          IndexPageInfo.new(code, url)
        end
      end
    end
  end
  items.flatten.compact
end

def extract_index_page_items()
  items = Dir.glob("_scratch/index_pages/*.html").map { |file_path| extract_items_from_index_page(file_path) }
  items.flatten
end

def unique_index_page_items(items)
  unique_items = {}
  items.each { |item| unique_items[item.code] = item }
  unique_items.values
end

def download_info_page(url_path)
  response = HTTParty.get("https://www.resene.co.nz/swatches/#{url_path}", verify: false)
  response.body if response.code == 200
end

def download_info_pages()
  items = extract_index_page_items()
  unique_items = unique_index_page_items(items)
  puts items.count, unique_items.count
  unique_items.each do |item|
    path = "_scratch/info_pages/#{item.code}.html"
    next if File.exist?(path)
    content = download_info_page(item.url_path)
    next if !content
    open(path, "wb") do |io|
      io.write(content)
      puts item.url_path
    end
  end
end

####

ColorInfo = Struct.new(:code, :name, :is_cool, :rgb, :lab, :lrv, :complements) do
end

def extract_info_from_page(file_path)
  puts file_path
  doc = Nokogiri::HTML(File.read(file_path))
  trs = doc.xpath("//div[@class='MainTable2']//table//tr")
  color_name = trs[0].xpath("td")[2].text
  color_is_cool = color_name.end_with?(" cc")
  color_name = color_name.sub(" cc", "").sub(" ", "").sub("Resene", "").strip
  color_code = trs[2].xpath("td")[1].text.strip
  color_rgb_r = trs[7].xpath("td")[0].text.to_i
  color_rgb_g = trs[7].xpath("td")[1].text.to_i
  color_rgb_b = trs[7].xpath("td")[2].text.to_i
  color_lab_l = trs[9].xpath("td//table//tr//td")[0].text.to_f
  color_lab_a = trs[9].xpath("td//table//tr//td")[1].text.to_f
  color_lab_b = trs[9].xpath("td//table//tr//td")[2].text.to_f
  color_lrv = trs[13].xpath("td//table//tr//td")[0].text.to_i
  complements = trs[18].xpath("td//table//tr//td")
  color_complement_1 = complements[1]&.text&.sub("Resene", "")&.strip
  color_complement_2 = complements[3]&.text&.sub("Resene", "")&.strip
  color_complement_3 = complements[5]&.text&.sub("Resene", "")&.strip
  ColorInfo.new(
    color_code,
    color_name,
    color_is_cool,
    { r: color_rgb_r, g: color_rgb_g, b: color_rgb_b },
    { l:color_lab_l, a: color_lab_a, b: color_lab_b },
    color_lrv,
    [color_complement_1, color_complement_2, color_complement_3 ].compact
  )
end

def process_info_pages
  items = Dir.glob("_scratch/info_pages/*.html").map { |file_path| extract_info_from_page(file_path) }
  File.open("colors.json", 'w') do |f|
    f.puts JSON.pretty_generate({colors: items.map { |item| item.to_h } })
  end
end

####

OptionParser.new do |opts|
  opts.on("--download-index-pages") do
    download_index_pages()
  end

  opts.on("--extract_items_from_index_page PATH") do |file_path|
    pp extract_items_from_index_page(file_path)
  end

  opts.on("--download-info-pages") do
    download_info_pages()
  end

  opts.on("--process-info-pages") do
    process_info_pages()
  end

  opts.on("--process-info-page PATH") do |file_path|
    pp JSON.pretty_generate(extract_info_from_page(file_path))
  end
end.parse!
